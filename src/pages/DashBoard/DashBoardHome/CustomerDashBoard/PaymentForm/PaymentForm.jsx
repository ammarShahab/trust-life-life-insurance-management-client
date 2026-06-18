import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../components/Loading/Loading";
import useAuth from "../../../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const PaymentForm = ({ state }) => {
  // const { state } = useLocation();
  // console.log("state from payment form", state);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { applicationId } = useParams();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const { isLoading, data: applicationInfo = {} } = useQuery({
    queryKey: ["applications", applicationId],
    enabled: !!applicationId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/policy-applications/${applicationId}`,
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
  const amount = amountInDecimal * 100;
  const paymentDuration = state?.paymentDuration;

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

    startTransition(async () => {
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
        console.log("Creating payment intent with amount:", amount);
        const res = await axiosSecure.post("/create-payment-intent", {
          amount,
          applicationId,
          paymentDuration,
        });
        console.log("Payment intent response:", res.data);
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
        }       else {
          setError("");
          console.log("Payment result", result);
          console.log("Payment intent status:", result.paymentIntent.status);
          console.log("Payment intent ID:", result.paymentIntent.id);
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
              paymentMethod: result.paymentIntent.payment_method,
              paymentDuration,
              status: applicationInfo.status,
            };

            console.log("Payment data being sent:", paymentData);

            console.log("Sending payment to /payments endpoint...");
            try {
              const paymentRes = await axiosSecure.post("/payments", paymentData);
              console.log("Payment response:", paymentRes.data);
              if (paymentRes.data.insertedId) {
                // console.log("Successfully Paid for the parcel");
                await Swal.fire({
                  title: "✅ Payment Successful!",
                  html: `Your transaction ID is:<br><strong>${transactionId}</strong>`,
                  icon: "success",
                  confirmButtonText: "OK",
                });
                navigate("/dashboard/payment-status");
              } else {
                console.error("Payment failed: No insertedId in response");
                Swal.fire({
                  title: "❌ Payment Processing Error",
                  text: "Payment was processed by Stripe but failed to save to the database. Please contact support with your transaction ID.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            } catch (error) {
              console.error("Error processing payment:", error);
              Swal.fire({
                title: "❌ Payment Error",
                text: "An error occurred while processing your payment. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }
        }
      }
    });
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
          disabled={!stripe || isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            "Pay"
          )}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PaymentForm;
