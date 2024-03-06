// cartCalculations.js
import store from "../store/index.js";

function calculateSubtotal(cartItems) {
  if (!Array.isArray(cartItems) || !cartItems.length) {
    // Handle the case where cartItems is not an array or is empty
    return '0.00';
  }

  const total = cartItems.reduce((acc, product) => {
    // Using product.product.price as a fallback when product.price is NaN
    const price = product.product.price;
    return (acc + price) * product.product.quantity;
  }, 0);

  return total.toFixed(2);
}

function calculateShippingEstimate(cartItems, subtotal, checkoutForm, taxEstimate) {
  const shippingRatePercentageOfSubtotal = import.meta.env
    .VITE_SHIPPING_RATE_PERCENTAGE_OF_SUBTOTAL;
  const shippingRatePercentagePerProduct = import.meta.env
    .VITE_SHIPPING_RATE_PERCENTAGE_PER_PRODUCT;
  const shippingRateFixedPrice = import.meta.env.VITE_SHIPPING_FIXED_PRICE;
  const shippingFreeAbove = import.meta.env.VITE_SHIPPING_FREE_ABOVE;
  const chooseShipping = import.meta.env.VITE_CHOOSE_SHIPPING_RATE;

  // Calculate total amount including subtotal and tax estimate
  const totalAmount = parseFloat(subtotal) + parseFloat(taxEstimate);

  if (
    shippingFreeAbove &&
    totalAmount >= parseFloat(shippingFreeAbove)
  ) {
    return "0"; // Free shipping if total amount exceeds shippingFreeAbove
  }

  if (chooseShipping) {
    if (checkoutForm) {
      return parseFloat(checkoutForm.deliveryMethod.price).toFixed(2);
    } else {
      return store.state.deliveryMethods[0].price;
    }
  }

  if (shippingRatePercentageOfSubtotal) {
    // Calculate the initial shipping estimate based on the subtotal and shipping rate
    // Ensure shippingRate is interpreted as a percentage (e.g., 0.1 for 10%)
    const estimate =
      parseFloat(subtotal) * parseFloat(shippingRatePercentageOfSubtotal);
    return estimate.toFixed(2);
  }

  if (shippingRatePercentagePerProduct) {
    const estimate = cartItems.reduce((acc, product) => {
      // Using product.product.price as a fallback when product.price is NaN
      const price = isNaN(product.price) ? product.product.price : product.price;
      return (
        acc +
        price *
          product.quantity *
          parseFloat(shippingRatePercentagePerProduct)
      );
    }, 0);
    return estimate.toFixed(2);
  }

  if (shippingRateFixedPrice) {
    return shippingRateFixedPrice;
  }
}

function calculateTaxEstimate(subtotal, taxRate) {
  const tax = parseFloat(subtotal) * taxRate;
  return tax.toFixed(2);
}

function calculateOrderTotal(subtotal, shippingEstimate, taxEstimate) {
  const total =
    parseFloat(subtotal) * 100 +
    parseFloat(shippingEstimate) * 100 +
    parseFloat(taxEstimate) * 100;
  return (total / 100).toFixed(2);
}

export {
  calculateSubtotal,
  calculateShippingEstimate,
  calculateTaxEstimate,
  calculateOrderTotal,
};
