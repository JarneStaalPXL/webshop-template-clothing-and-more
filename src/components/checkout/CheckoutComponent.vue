<template>
  <div class="bg-gray-50">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Checkout</h2>

      <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">Contact information</h2>

            <div class="mt-4">
              <label for="email-address" class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  v-model="checkoutForm.email"
                  type="email"
                  id="email-address"
                  name="email-address"
                  autocomplete="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>

            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label for="first-name" class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.firstName"
                    type="text"
                    id="first-name"
                    name="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="last-name" class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.lastName"
                    type="text"
                    id="last-name"
                    name="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="company" class="block text-sm font-medium text-gray-700"
                  >Company</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.company"
                    type="text"
                    name="company"
                    id="company"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700"
                  >Address</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.address"
                    type="text"
                    name="address"
                    id="address"
                    autocomplete="street-address"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="apartment" class="block text-sm font-medium text-gray-700"
                  >Apartment, suite, etc.</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.apartment"
                    type="text"
                    name="apartment"
                    id="apartment"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="city" class="block text-sm font-medium text-gray-700"
                  >City</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.city"
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div class="mt-1">
                  <Listbox as="div" v-model="checkoutForm.country">
                    <ListboxLabel
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Country</ListboxLabel
                    >
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <span class="block truncate">{{ checkoutForm.country }}</span>
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
                            v-for="country in countries"
                            :key="country.id"
                            :value="country"
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
                                >{{ country }}</span
                              >

                              <span
                                v-if="selected"
                                :class="[
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                ]"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                </div>
              </div>

              <div>
                <label for="region" class="block text-sm font-medium text-gray-700"
                  >State / Province</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.province"
                    type="text"
                    name="region"
                    id="region"
                    autocomplete="address-level1"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="postal-code" class="block text-sm font-medium text-gray-700"
                  >Postal code</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.postalCode"
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-medium text-gray-700"
                  >Phone</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.phone"
                    type="text"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <RadioGroup v-model="checkoutForm.deliveryMethod">
              <RadioGroupLabel class="text-lg font-medium text-gray-900"
                >Delivery method</RadioGroupLabel
              >

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption
                  as="template"
                  v-for="deliveryMethod in $store.state.deliveryMethods"
                  :key="deliveryMethod.id"
                  :value="deliveryMethod"
                  v-slot="{ checked, active }"
                >
                  <div
                    :class="[
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'ring-2 ring-indigo-500' : '',
                      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                    ]"
                  >
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <RadioGroupLabel
                          as="span"
                          class="block text-sm font-medium text-gray-900"
                          >{{ deliveryMethod.title }}</RadioGroupLabel
                        >
                        <RadioGroupDescription
                          as="span"
                          class="mt-1 flex items-center text-sm text-gray-500"
                          >{{ deliveryMethod.turnaround }}</RadioGroupDescription
                        >
                        <RadioGroupDescription
                          as="span"
                          class="mt-6 text-sm font-medium text-gray-900"
                          >{{ $store.state.currency.symbol }}
                          {{ deliveryMethod.price }}</RadioGroupDescription
                        >
                      </span>
                    </span>
                    <CheckCircleIcon
                      v-if="checked"
                      class="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span
                      :class="[
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg',
                      ]"
                      aria-hidden="true"
                    />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>

          <!-- Payment -->
          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Payment</h2>

            <fieldset class="mt-4">
              <legend class="sr-only">Payment type</legend>
              <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div
                  v-for="paymentMethod in paymentMethods"
                  :key="paymentMethod.id"
                  class="flex items-center"
                >
                  <input
                    :disabled="paymentMethod.disabled"
                    :id="paymentMethod.id"
                    name="payment-type"
                    type="radio"
                    v-model="checkoutForm.paymentType"
                    :value="paymentMethod.id"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    :for="paymentMethod.id"
                    class="ml-3 block text-sm font-medium text-gray-700"
                    >{{ paymentMethod.title }}</label
                  >
                </div>
              </div>
            </fieldset>

            <div
              class="mt-6 grid grid-cols-4 gap-x-4 gap-y-6"
              v-if="checkoutForm.paymentMethod === 'credit-card'"
            >
              <div class="col-span-4">
                <label for="card-number" class="block text-sm font-medium text-gray-700"
                  >Card number</label
                >
                <div class="mt-1">
                  <input
                    v-model.lazy="checkoutForm.cardNumber"
                    @input="formatCardNumber"
                    type="text"
                    id="card-number"
                    name="card-number"
                    autocomplete="cc-number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <span>{{ cardTypeUsed }}</span>
              </div>

              <div class="col-span-4">
                <label for="name-on-card" class="block text-sm font-medium text-gray-700"
                  >Name on card</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.nameOnCard"
                    type="text"
                    id="name-on-card"
                    name="name-on-card"
                    autocomplete="cc-name"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="col-span-3">
                <label
                  for="expiration-date"
                  class="block text-sm font-medium text-gray-700"
                  >Expiration date (MM/YY)</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.expirationDate"
                    type="text"
                    name="expiration-date"
                    id="expiration-date"
                    autocomplete="cc-exp"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label for="cvc" class="block text-sm font-medium text-gray-700"
                  >CVC</label
                >
                <div class="mt-1">
                  <input
                    v-model="checkoutForm.cvc"
                    type="text"
                    maxlength="3"
                    name="cvc"
                    id="cvc"
                    autocomplete="csc"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

          <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="product in $store.state.cart"
                :key="product.id"
                class="flex px-4 py-6 sm:px-6"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="product.product.images[0].src"
                    :alt="product.product.images[0].alt"
                    class="w-20 rounded-md"
                  />
                </div>

                <div class="ml-6 flex flex-1 flex-col">
                  <div class="flex">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <router-link
                          :to="`/products/${product.id}`"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ product.product.name }}</router-link
                        >
                      </h4>
                      <p class="mt-1 text-sm text-gray-500" v-if="product.color">
                        {{ product.color.name }}
                      </p>
                      <!-- <p class="mt-1 text-sm text-gray-500">{{ product.size }}</p> -->
                    </div>

                    <!-- <div class="ml-4 flow-root flex-shrink-0">
                      <button
                        type="button"
                        class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div> -->
                  </div>

                  <div class="flex flex-1 items-end justify-between pt-2">
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ product.price }}
                    </p>

                    <div class="flex flex-col w-full">
                      <label for="quantity" class="sr-only">Quantity</label>
                      <Listbox
                        as="div"
                        v-model="product.product.quantity"
                        :disabled="true"
                      >
                        <ListboxLabel
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Quantity</ListboxLabel
                        >
                        <div class="relative">
                          <div
                            class="relative w-full py-1.5 pr-10 text-left text-gray-900 sm:text-sm sm:leading-6"
                          >
                            <span class="block truncate"
                              >{{ product.product.quantity }} pcs</span
                            >
                          </div>

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
                                    'relative cursor-default select-none py-2 pl-3',
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
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div class="flex items-center justify-between">
                <dt class="text-sm">Subtotal</dt>
                <dd class="text-sm font-medium text-gray-900">
                  {{ $store.state.currency.symbol }} {{ subtotal }}
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm">Shipping</dt>
                <dd class="text-sm font-medium text-gray-900">
                  {{ $store.state.currency.symbol }} {{ shippingEstimate }}
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm">Taxes</dt>
                <dd class="text-sm font-medium text-gray-900">
                  {{ $store.state.currency.symbol }} {{ taxEstimate }}
                </dd>
              </div>
              <div
                class="flex items-center justify-between border-t border-gray-200 pt-6"
              >
                <dt class="text-base font-medium">Total</dt>
                <dd class="text-base font-medium text-gray-900">
                  {{ $store.state.currency.symbol }} {{ orderTotal }}
                </dd>
              </div>
            </dl>

            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                @click.prevent="submitOrder"
                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  ListboxOption,
  ListboxOptions,
  ListboxButton,
  Listbox,
  ListboxLabel,
} from "@headlessui/vue";
import {
  CheckCircleIcon,
  TrashIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/vue/20/solid";

import {
  calculateSubtotal,
  calculateShippingEstimate,
  calculateTaxEstimate,
  calculateOrderTotal,
} from "../../helpers/cartCalculation";

export default {
  name: "CheckoutComponent",
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    CheckCircleIcon,
    TrashIcon,
    ListboxOption,
    ListboxOptions,
    ListboxButton,
    Listbox,
    ListboxLabel,
    ChevronUpDownIcon,
    CheckIcon,
  },
  data() {
    return {
      cardTypeUsed: "",
      checkoutForm: {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        address: "",
        apartment: "",
        city: "",
        country: "Belgium",
        province: "",
        postalCode: "",
        phone: "",
        deliveryMethod: {},
        paymentType: "",
        cardNumber: "",
        nameOnCard: "",
        expirationDate: "",
        cvc: "",
      },
      selectedCountry: "Belgium",
      countries: [
        "United States",
        "Canada",
        "Mexico",
        "Belgium",
        "France",
        "Germany",
        "Netherlands",
        "Spain",
        "Switzerland",
        "United Kingdom",
      ].sort(), // Sort the countries array alphabetically

      paymentMethods: [
        { id: "stripe", title: "Stripe", disabled: false },
        { id: "paypal", title: "PayPal", disabled: true },
      ],
      selectedDeliveryMethod: null,
      cart: this.$store.state.cart,
    };
  },
  created() {
    this.checkoutForm.deliveryMethod = this.$store.state.deliveryMethods[0];
    this.checkoutForm.paymentType = this.paymentMethods[0].id;
  },
  methods: {
    async submitOrder() {
      this.cart.subtotal = this.subtotal;
      this.cart.shippingEstimate = this.shippingEstimate;
      this.cart.taxEstimate = this.taxEstimate;
      this.cart.orderTotal = this.orderTotal;
      localStorage.setItem("cart", JSON.stringify(this.cart));

      await this.$store.dispatch("SUBMIT_ORDER", {
        checkoutForm: this.checkoutForm,
        cart: this.cart,
      });
    },
    formatCardNumber(event) {
      // Remove all non-digit characters from the input
      let cardNumber = event.target.value.replace(/\D/g, "");

      // Add a space after the first 4 digits and then after every 4 digits for display
      // This regex matches the first 4 digits and then every subsequent 4 digits
      let formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

      // Limit the card number to 16 digits for display, considering spaces as well
      // Note: Adjust the limit if you want to accommodate longer card numbers (e.g., 19 for Amex)
      formattedCardNumber = formattedCardNumber.substring(0, 19);

      // Update the model value with the formatted card number for display
      this.checkoutForm.cardNumber = formattedCardNumber;
      // Optionally, update the input value to reflect the formatting
      event.target.value = formattedCardNumber;

      // Ensure card number is clean (without spaces) before passing to getCardType
      // The .replace(/\s/g, '') removes any spaces before passing it to getCardType
      this.cardTypeUsed = this.getCardType(cardNumber.replace(/\s/g, ""));
      console.log(this.cardTypeUsed);
    },

    getCardType(cardNumber) {
      // Define regular expressions for each card type based on the first 4 digits
      const cardTypes = {
        visa: /^4\d{3}/, // Visa cards start with 4
        mastercard: /^5[1-5]\d{2}/, // MasterCard cards start with 51 through 55
        amex: /^3[47]\d{2}/, // American Express cards start with 34 or 37
        discover: /^6(?:011|5\d{2})/, // Discover cards start with 6011 or 65
      };

      // Extract the first 4 digits of the card number for type checking
      const first4Digits = cardNumber.substring(0, 4);

      // Check each card type to see if the first 4 digits match
      if (cardTypes.visa.test(first4Digits)) {
        console.log("visa");
        return "visa";
      } else if (cardTypes.mastercard.test(first4Digits)) {
        return "mastercard";
      } else if (cardTypes.amex.test(first4Digits)) {
        return "amex";
      } else if (cardTypes.discover.test(first4Digits)) {
        return "discover";
      }

      // If none of the above patterns match, return null
      return null;
    },
  },
  computed: {
    subtotal() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.subtotal = calculateSubtotal(this.cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart.subtotal;
    },
    shippingEstimate() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.shippingEstimate = calculateShippingEstimate(
        this.cart,
        this.subtotal,
        this.checkoutForm
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart.shippingEstimate;
    },
    taxEstimate() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.taxEstimate = calculateTaxEstimate(this.subtotal, this.$store.state.taxRate);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart.taxEstimate;
    },
    orderTotal() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.orderTotal = calculateOrderTotal(
        this.subtotal,
        this.shippingEstimate,
        this.taxEstimate
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart.orderTotal;
    },
  },
};
</script>
