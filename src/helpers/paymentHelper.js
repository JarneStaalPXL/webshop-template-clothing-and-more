import { loadStripe } from "@stripe/stripe-js";
import { createPUTRequestAsync, createPOSTRequestAsync } from "./requestHelper";
import store from "../store";

async function redirectToStripeCheckoutWithProducts({
  cart,
  currency,
  checkoutForm,
  customerId,
  cartId,

}) {
  console.log('Mapping products for Stripe checkout.');

  let products = cart.map((product) => {
    let productName = product.product.name;
    if (product.color) {
      productName += ` (${product.color.name})`;
    }

    return {
      price_data: {
        currency: currency.code,
        product_data: {
          name: productName,
          images: [product.product.ImagesWithAlternativeText[0].image.url],
        },
        unit_amount: product.product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  // Adding Shipping
  console.log('Adding shipping costs to Stripe checkout products.');
  products.push({
    price_data: {
      currency: currency.code,
      product_data: {
        name: "Shipping",
        images: [
          "https://static.vecteezy.com/system/resources/previews/000/628/936/original/shipping-truck-icon-vector.jpg",
        ],
      },
      unit_amount: Math.round(cart.shippingEstimate * 100),
    },
    quantity: 1,
  });

  // Adding Taxes
  console.log('Adding tax costs to Stripe checkout products.');
  products.push({
    price_data: {
      currency: currency.code,
      product_data: {
        name: "Taxes",
        images: [
          "https://static.vecteezy.com/system/resources/previews/001/500/372/original/tax-report-icon-free-vector.jpg",
        ],
      },
      unit_amount: Math.round(cart.taxEstimate * 100),
    },
    quantity: 1,
  });

  // Constructing Cost Details
  console.log('Calculating cost details for order.');
  let costDetails = {
    subtotal: Number.parseFloat(cart.subtotal),
    shipping: Number.parseFloat(cart.shippingEstimate),
    tax: Number.parseFloat(cart.taxEstimate),
    total:
      Number.parseFloat(cart.subtotal) +
      Number.parseFloat(cart.shippingEstimate) +
      Number.parseFloat(cart.taxEstimate),
  };

  // Creating Checkout Session with Stripe
  console.log('Creating checkout session with Stripe.');
  const response = await fetch(
    `${import.meta.env.VITE_STRIPE_BACKEND_URL}/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: products,
        customerId: store.state.user?.id || null,
        currency: currency.code,
        cartId: localStorage.getItem("cartId") || null,
        cost_details: costDetails,
      }),
    }
  );

  const session = await response.json();
  console.log('Stripe checkout session created:', session);

  // Creating Order in Database
  console.log('Creating order in the database with the following details:', {
    customerId,
    cartId,
    checkoutSessionId: session.sessionId,
    currency,
    costDetails,
    checkoutForm,
  });



  const orderResponse = await createPOSTRequestAsync(
    `/order-detail/create-order`,
    {
      customerId,
      cartId,
      checkoutSessionId: session.sessionId,
      currency,
      cost_details: costDetails,
      checkoutForm,
      shipping_information: {
        firstname : checkoutForm.firstName,
        lastname : checkoutForm.lastName,
        companyName : checkoutForm.company,
        streetAddressAndHouseNumber : checkoutForm.address,
        city : checkoutForm.city,
        country : checkoutForm.country.name,
        province: checkoutForm.province,
        postalCode : checkoutForm.postalCode,
      },
      contact_information: {
        email: checkoutForm.email,
        phoneNumber: checkoutForm.phone,
      },
      payment_information: {
        paymentType: checkoutForm.paymentType,
        currencySymbol: currency.symbol,
        currencyCode: currency.code,
      },
    }
  );

  const order = await orderResponse.json();
  console.log('Order created in the database:', order);

  // Redirect to Stripe Checkout (Uncomment in production)
  console.log('Redirecting to Stripe checkout page.');
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  await stripe.redirectToCheckout({ sessionId: session.sessionId });

  return { sessionId: session.id };
}

async function updateOrderWithPaymentIntentId(sessionId) {
  // Make sure that the id is not undefined
  if (!sessionId) {
    console.error('Session ID is undefined.');
    return;
  }

  const response = await fetch(
    `${import.meta.env.VITE_STRIPE_BACKEND_URL}/update-order-with-payment-intent-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId, // Confirm this is the correct property for session ID
      }),
    }
  );

  // Log the status and response for debugging
  const status = response.status;
  const order = await response.json();


  console.log(`Response status: ${status}`, 'Order updated with payment intent id:', order);
  return order;

}




export { redirectToStripeCheckoutWithProducts,updateOrderWithPaymentIntentId };
