import { loadStripe } from "@stripe/stripe-js";

async function redirectToStripeCheckoutWithProducts(cart, currency) {
    console.log("🚀 ~ redirectToStripeCheckoutWithProducts ~ products:", cart);

    let products = cart.map((product) => { 
        return {
            price_data: {
                currency: currency,
                product_data: {
                    name: product.product.name,
                    images: [product.product.images[0].src],
                },
                unit_amount: product.product.price * 100,
            },
            quantity: product.product.quantity,
        };
    });

    products.push({
        price_data: {
            currency: currency,
            product_data: {
                name: "Shipping",
                images: ["https://drive.google.com/uc?id=1u7Nc7AXVs5lRMZHX8Pa8X58uFt6ZW0FW"],
            },
            unit_amount: cart.shippingEstimate * 100,
        },
        quantity: 1,
    })

    products.push({
        price_data: {
            currency: currency,
            product_data: {
                name: "Taxes",
                // images: ["https://www.flaticon.com/svg/static/icons/svg/25/25694.svg"],
            },
            unit_amount: cart.taxEstimate * 100,
        },
        quantity: 1,
        
    })

    console.log("products",products);
    
    const response = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            products: products,
            currency: currency,
        }),
    });
    console.log(response);

    const session = await response.json();
    const stripe = await loadStripe("pk_live_0PECHwHMSwUkUryUP0w4iSJ90008XaXnmP");
    stripe.redirectToCheckout({ sessionId: session.id });
}


export { redirectToStripeCheckoutWithProducts };
