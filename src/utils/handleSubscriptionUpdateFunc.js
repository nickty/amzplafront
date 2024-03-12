import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load your Stripe publishable key here
const stripePromise = loadStripe("pk_test_5FP3G91UsZjWsz1Wo9ORkFpO");

const handleSubscriptionUpdateFunc = async (plan) => {
  const stripe = await stripePromise;

  // Mapping plan to Stripe Price ID
  const priceMap = {
    free: null,
    basic: "price_1OtBVLDfbgwMzlY8bk5uqP65", // Your Stripe Price ID for basic
    premium: "price_1OtOQADfbgwMzlY83ikrPJJ3", // Your Stripe Price ID for premium
  };

  const priceId = priceMap[plan];

  if (!priceId) {
    alert("Free plan selected or invalid plan. No payment required.");
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/payment/create-checkout-session`,
      { planId: priceId }
    );

    const { sessionId } = response.data;

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Error during payment:", error.message);
      alert("Payment failed. Please try again later.");
    }
  } catch (error) {
    console.error("Error during payment:", error.message);
    alert("Payment failed. Please try again later.");
  }
};

export default handleSubscriptionUpdateFunc;
