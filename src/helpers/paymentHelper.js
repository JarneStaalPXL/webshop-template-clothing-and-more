import { loadStripe } from "@stripe/stripe-js";


async function redirectToStripeCheckoutWithProducts(cart, currency) {
    let products = cart.map((product) => { 
        let productName = product.product.name;
        if (product.color) {
            productName += ` (${product.color.name})`;
        }

        return {
            price_data: {
                currency: currency,
                product_data: {
                    name: productName,
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
                images: ["https://raw.githubusercontent.com/JarneStaalPXL/webshop-template-clothing-and-more/main/src/assets/shipping.svg?token=GHSAT0AAAAAACKGJAIEPK4OTIWKIHPVQXJGZON2STQ"],
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
                images: ["https://raw.githubusercontent.com/JarneStaalPXL/webshop-template-clothing-and-more/main/src/assets/taxes.svg?token=GHSAT0AAAAAACKGJAIE4V3VYZMDPERFY4NUZON2T2Q"],
            },
            unit_amount: cart.taxEstimate * 100,
        },
        quantity: 1,
        
    })
    
    const response = await fetch(`${import.meta.env.VITE_STRIPE_BACKEND_URL}/create-checkout-session`, {
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
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    stripe.redirectToCheckout({ sessionId: session.id });
}


export { redirectToStripeCheckoutWithProducts };
