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
import { createGETRequestAsync, createPOSTRequestAsync } from "../helpers/requestHelper";
import { updateOrderWithPaymentIntentId } from "../helpers/paymentHelper";
export default {
  name: "RedirectAfterPaymentView",
  query: {
    sessionId: {
      type: String,
      required: true,
    },
    orderNumberId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checkoutSessionId: null,
      orderNumberId: null,
      paymentStatus: null,
    };
  },
  async mounted() {
    // Assign the query parameters to component data properties
    this.checkoutSessionId = this.$route.query.session_id;
    console.log(this.$route.query.session_id);
    // this.orderNumberId = this.$route.query.order_id;
    await this.updateOrderStatus();
  },
  methods: {
    async updateOrderStatus() {
      let orderObject = await updateOrderWithPaymentIntentId(
        this.$route.query.session_id
      );
      console.log("🚀 ~ updateOrderStatus ~ orderObject:", orderObject);
      if (orderObject.paymentIntentId && orderObject.isPaid === true) {
        // Redirect to the success view
        this.$router.push({
          name: "CheckoutSuccessView",
          query: {
            sessionId: orderObject.checkoutSessionId,
            orderNumberId: orderObject.id,
          },
        });
      }
    },
  },
};
</script>
