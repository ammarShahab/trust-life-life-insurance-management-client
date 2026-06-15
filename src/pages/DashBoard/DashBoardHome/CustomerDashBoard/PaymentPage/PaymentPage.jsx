import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../PaymentForm/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const PaymentPage = () => {
  // const { state } = useLocation();
  // console.log("state in payment page", state);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default PaymentPage;
