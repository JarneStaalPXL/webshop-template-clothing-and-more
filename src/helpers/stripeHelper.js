import { loadStripe } from "@stripe/stripe-js";

async function redirectToStripeCheckout(amount, currency) {
    console.log(amount, currency);
    const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amount, // make sure this is in the smallest currency unit, e.g., cents for USD
            currency: currency,
        }),
    });
    console.log(response);

    const session = await response.json();
    const stripe = await loadStripe("pk_live_0PECHwHMSwUkUryUP0w4iSJ90008XaXnmP");
    stripe.redirectToCheckout({ sessionId: session.id });
}

export { redirectToStripeCheckout };
