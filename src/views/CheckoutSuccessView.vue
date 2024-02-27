<template>
  <div class="flex flex-col items-center justify-center h-screen" v-if="orderNumberId">
    <h1 class="text-4xl font-bold mb-4">Checkout Success</h1>
    <p class="text-lg mb-2">
      Your order with ordernumber #{{ orderNumberId }} has been successfully placed.
    </p>
    <p>Checkout Session Id: {{ checkoutSessionId }}</p>
    <br />
    <p class="text-lg">Thank you for shopping with us!</p>
  </div>
</template>

<script>
import { createGETRequestAsync } from "../helpers/requestHelper";

export default {
  name: "CheckoutSuccessView",
  data() {
    return {
      checkoutSessionId: null,
      orderNumberId: null,
      paymentStatus: null,
    };
  },
  async beforeMount() {
    const queryParams = new URLSearchParams(window.location.search);
    this.checkoutSessionId = queryParams.get("session_id");

    if (this.checkoutSessionId) {
      await this.confirmPayment();
    }
  },
  methods: {
    async confirmPayment() {
      try {
        const response = await createGETRequestAsync(
          `/retrieve-checkout-session/${this.checkoutSessionId}`
        );

        if (response.ok) {
          const data = await response.json();
          this.paymentStatus = data.paymentIntent.status;

          if (this.paymentStatus === "succeeded") {
            // You can now create an order number using a method that you define.
            this.orderNumberId = this.createOrderNumber();
            // You may also want to dispatch an action to store the order details in your database
          } else {
            // Handle payment failure
            console.error("Payment did not succeed");
          }
        } else {
          // Handle error response
          console.error("Failed to confirm payment", response.status);
        }
      } catch (error) {
        console.error("Error confirming payment", error);
      }
    },
    createOrderNumber() {
      // Implement your logic to create an order number
      // This could be generating a unique ID, fetching it from the backend, etc.
      // For this example, let's just simulate it with a random number:
      return Math.floor(Math.random() * 1000000).toString();
    },
  },
};
</script>
