<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <main class="relative lg:min-h-full">
    <div
      class="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12"
    >
      <img
        src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
        alt="TODO"
        class="h-full w-full object-cover object-center"
      />
    </div>

    <div>
      <div
        v-if="order"
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24"
      >
        <div class="lg:col-start-2">
          <h1 class="text-sm font-medium text-indigo-600">
            Payment successful
          </h1>
          <p
            class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Thanks for ordering
          </p>
          <p class="mt-2 text-base text-gray-500">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>

          <dl class="mt-16 text-sm font-medium">
            <dt class="text-gray-900">Order number</dt>
            <dd class="mt-2 text-indigo-600 cursor-pointer" @click="$router.push('/account/orders')">{{ orderNumberId }}</dd>
          </dl>

          <ul
            role="list"
            class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            <li
              v-for="product in order.shopping_cart.Products"
              :key="product.id"
              class="flex space-x-6 py-6"
            >
              <img
                :src="product.product.ImagesWithAlternativeText[0].image.url"
                :alt="product.product.ImagesWithAlternativeText[0].alt"
                class="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
              />
              <div class="flex flex-col justify-between h-full min-h-[90px]">
                <!-- Adjust the min-h value as needed -->
                <h3 class="text-gray-900">
                  <router-link :to="'/product/' + product.product.id">{{
                    product.product.name
                  }}</router-link>
                </h3>

                <div class="flex items-center" v-if="product.pc">
                  <div
                    :class="`rounded-full border border-transparent ring-2 ring-black ring-offset-2 ring-offset-white`"
                    :style="{
                      background: product.pc.color,
                      width: '25px',
                      height: '25px',
                    }"
                  ></div>
                  <div class="ml-3">{{ product.pc.name }}</div>
                </div>
                <!-- <p>{{ product.size }}</p> -->
              </div>

              <p class="flex-none font-medium text-gray-900">
                {{ product.price }}
              </p>
            </li>
          </ul>

          <dl
            class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500"
          >
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd class="text-gray-900">{{order.payment_information.currencySymbol}} {{ order.cost_details.subtotal }}</dd>
            </div>

            <div class="flex justify-between">
              <dt>Shipping</dt>
              <dd class="text-gray-900">{{order.payment_information.currencySymbol}} {{ order.cost_details.shipping }}</dd>
            </div>

            <div class="flex justify-between">
              <dt>Taxes</dt>
              <dd class="text-gray-900">{{order.payment_information.currencySymbol}} {{ order.cost_details.tax }}</dd>
            </div>

            <div
              class="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">{{order.payment_information.currencySymbol}} {{ order.cost_details.total }}</dd>
            </div>
          </dl>

          <dl class="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
            <div>
              <dt class="font-medium text-gray-900">Shipping Address</dt>
              <dd class="mt-2">
                <address class="not-italic">
                  <span class="block">{{order.shipping_information.firstname }} {{ order.shipping_information.lastname }}</span>
                  <span class="block">{{ order.shipping_information.streetAddressAndHouseNumber }}</span>
                  <span class="block">{{ order.shipping_information.postalCode }} {{order.shipping_information.city  }}</span>
                  <span class="block">{{ order.shipping_information.province }}, {{order.shipping_information.country  }}</span>
                </address>
              </dd>
            </div>
            <div v-if="paymentDetails">
              <dt class="font-medium text-gray-900">Payment Information</dt>
              <dd class="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                <div class="flex-none">
                 <PaymentTypeIcon :paymentType="paymentDetails.brand" />
                  <p class="sr-only">Visa</p>
                </div>
                <div class="flex-auto">
                  <p class="text-gray-900">Ending with {{ paymentDetails.last4 }}</p>
                  <p>Expires {{ paymentDetails.exp_month }} / {{ paymentDetails.exp_year.toString().slice(-2) }}</p>
                </div>
              </dd>
            </div>
          </dl>

          <div class="mt-16 border-t border-gray-200 py-6 text-right">
            <router-link
              to="/"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PaymentTypeIcon from "../components/shared/PaymentTypeIcon.vue";
import {
  createGETRequestAsync,
  createPOSTRequestAsync,
} from "../helpers/requestHelper";
export default {
  name: "CheckoutSuccessView",
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
      order: null,
      paymentDetails: null,
    };
  },
  components: {
    PaymentTypeIcon,
  },
  // beforeMount() {
  //   this.$store.commit("SET_SHOW_NAVIGATION_COMPONENT", false);
  //   this.$store.commit("SET_SHOW_FOOTER_COMPONENT", true);
  // },
  beforeMount() {
    this.$store.commit("SET_SHOW_NAVIGATION_COMPONENT", false);
    this.$store.commit("SET_SHOW_FOOTER_COMPONENT", true);

    this.$store.dispatch("CLEAR_CART");
    console.log(this.$route.query);

    // Assign the query parameters to component data properties
    this.checkoutSessionId = this.$route.query.sessionId;
    this.orderNumberId = this.$route.query.orderNumberId;

    if (this.checkoutSessionId && this.orderNumberId) {
      // Clear cart
      this.$store.dispatch("CLEAR_CART");
    }

    this.getOrderObject();
    this.getPaymentDetails();
  },
  methods: {
    async getOrderObject() {
      const response = await createGETRequestAsync(
        `/order-detail/get-order-by-id/${this.orderNumberId}`
      );
      const orderObject = await response.json();

      this.order = orderObject;
      console.log(orderObject);
    },
    async getPaymentDetails(){
      // Get the payment details from stripe and set fourLastNumbersOfPaymentCard
      const response = await fetch(import.meta.env.VITE_STRIPE_BACKEND_URL + '/get-payment-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.checkoutSessionId,
        }),
      });

      const paymentDetails = await response.json();
      console.log("🚀 ~ getPaymentDetails ~ paymentDetails:", paymentDetails)

      this.paymentDetails = paymentDetails;
    }
  },
};
</script>
