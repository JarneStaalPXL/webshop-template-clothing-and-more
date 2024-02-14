// cartCalculations.js

function calculateSubtotal(cartItems) {
    const total = cartItems.reduce((acc, product) => {
      return acc + product.product.price * product.product.quantity;
    }, 0);
    return total.toFixed(2);
  }
  
  function calculateShippingEstimate(cartItems) {
    const estimate = cartItems.length > 0 ? 5.0 : 0;
    return estimate.toFixed(2);
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
  }