import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../components/Loading/Loading";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const { state } = useLocation();
  // console.log("state from payment form", state);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { applicationId } = useParams();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isLoading, data: applicationInfo = {} } = useQuery({
    queryKey: ["applications", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policy-applications/${applicationId}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // console.log("Application info", applicationInfo);

  // console.log("application id", applicationId);
  const amountInDecimal = parseFloat(state?.premium);
  const amount = amountInDecimal;
  const paymentDuration = state?.paymentType;

  // console.log(amount);
  // console.log(paymentDuration);

  applicationInfo.premiumAmount = amount;
  applicationInfo.paymentTerm = paymentDuration;

  // console.log(applicationInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      // console.log("Payment Method", paymentMethod);
      setError("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        applicationId,
        paymentDuration,
      });
      // console.log("res from intent", res);

      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        // Show error to your customer

        setError(result.error.message);
        //   setSucceeded(false);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          // The payment has been processed!
          // setError(null);
          // setSucceeded(true);
          // console.log("Payment succeeded:", result.paymentIntent);
          // console.log(result);

          const transactionId = result.paymentIntent.id;

          const paymentData = {
            policyTitle: applicationInfo.policyTitle,
            policyId: state?.policyId,
            applicationId,
            email: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
            paymentDuration,
            status: applicationInfo.status,
          };

          // console.log("payment data", paymentData);

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            // console.log("Successfully Paid for the parcel");
            Swal.fire({
              title: "✅ Payment Successful!",
              html: `Your transaction ID is:<br><strong>${transactionId}</strong>`,
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/dashboard/payment-status");
          }
        }
      }
    }
  };

  return (
    <div className="max-w-4xl lg:w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800 dark:text-gray-300">
        Complete Your Payment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6 dark:bg-gradient-to-br dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
      >
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Policy Title
            </label>
            <input
              type="text"
              value={state?.policyTitle || "Unknown"}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Applicant's Name
            </label>
            <input
              type="text"
              value={user?.displayName || "Unknown"}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Applicant's Email
            </label>
            <input
              type="text"
              value={user?.email || "Unknown"}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Premium Amount
            </label>
            <input
              type="text"
              value={`${state?.premium}`}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Card Details
          </label>
          <div className="p-3 border rounded">
            <CardElement className="p-2 border space-x-4 rounded-2xl w-full dark:bg-gray-100" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600  text-white font-semibold py-2 rounded transition"
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PaymentForm;
