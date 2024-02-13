<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            v-if="$store.state.cart.length > 0"
            role="list"
            class="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li
              v-for="product in $store.state.cart"
              :key="product.id"
              class="flex py-6 sm:py-10"
            >
              <div class="flex-shrink-0">
                <img
                  :src="product.product.images[0].src"
                  :alt="product.product.images[0].alt"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <router-link
                          :to="'/product/' + product.product.id"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ product.product.name }}</router-link
                        >
                      </h3>
                    </div>

                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ $store.state.currency.symbol }}
                      {{ product.product.price }}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label class="sr-only">Quantity, {{ product.product.name }}</label>
                    <Listbox
                      as="div"
                      v-model="product.product.quantity"
                      @update:model-value="onQuantityChange(product, $event)"
                    >
                      <ListboxLabel
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Quantity</ListboxLabel
                      >
                      <div class="relative mt-2">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <span class="block truncate">{{
                            product.product.quantity
                          }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                          >
                            <ChevronUpDownIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition ease-in duration-100"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              as="template"
                              v-for="(i, index) in 10"
                              :key="index"
                              :value="i"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ i }}</span
                                >
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>

                    <div class="absolute right-0 top-0">
                      <button
                        type="button"
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        @click="removeProduct(product.product.id)"
                      >
                        <span class="sr-only">Remove</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex justify-between mt-10">
                  <div class="flex">
                    <div
                      :class="`rounded-full border border-transparent ring-2 ring-black ring-offset-2 ring-offset-white`"
                      :style="{
                        background: product.color.bgColor,
                        width: '25px',
                        height: '25px',
                      }"
                    ></div>
                    <div class="ml-3">{{ product.color.name }}</div>
                  </div>

                  <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                    <CheckIcon
                      v-if="product.product.inStock"
                      class="h-5 w-5 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                    <ClockIcon
                      v-else
                      class="h-5 w-5 flex-shrink-0 text-gray-300"
                      aria-hidden="true"
                    />
                    <span>{{
                      product.product.inStock
                        ? "In stock"
                        : `Ships in ${product.product.leadTime}`
                    }}</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <p v-else>You currently have an empty basket</p>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ $store.state.currency.symbol }} {{ subtotal }}
              </dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how shipping is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ $store.state.currency.symbol }} {{ shippingEstimate }}
              </dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how tax is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ $store.state.currency.symbol }} {{ taxEstimate }}
              </dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">
                {{ $store.state.currency.symbol }} {{ orderTotal }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

export default {
  components: {
    CheckIcon,
    ClockIcon,
    XMarkIcon,
    QuestionMarkCircleIcon,
    ChevronUpDownIcon,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },
  data() {
    return {
      // Assuming cart is initially empty or fetched from somewhere
      cart: this.$store.state.cart,
    };
  },
  computed: {
    subtotal() {
      const total = this.cart.reduce((acc, product) => {
        return acc + product.product.price * product.product.quantity;
      }, 0);
      return total.toFixed(2); // Keep as string
    },
    shippingEstimate() {
      const estimate = this.cart.length > 0 ? 5.0 : 0;
      return estimate.toFixed(2); // Keep as string
    },
    taxEstimate() {
      const tax = parseFloat(this.subtotal) * this.$store.state.taxRate; // Access as a property
      return tax.toFixed(2); // Keep as string
    },
    orderTotal() {
      // Perform calculation in integer space (cents) to avoid floating point precision issues
      const total =
        parseFloat(this.subtotal) * 100 +
        parseFloat(this.shippingEstimate) * 100 +
        parseFloat(this.taxEstimate) * 100;
      return (total / 100).toFixed(2); // Convert back to dollars and fix to 2 decimal places
    },
  },
  methods: {
    onQuantityChange(product, newQuantity) {
      product.product.quantity = newQuantity;
      this.$store.commit("updateProductQuantity", {
        productId: product.id,
        quantity: newQuantity,
      });
    },
    removeProduct(productId) {
      this.$store.commit("removeProductFromCart", productId);
    },
  },
};
</script>
