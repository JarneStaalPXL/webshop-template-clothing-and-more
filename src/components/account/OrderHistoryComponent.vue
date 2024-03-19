<template>
  <section>
    <div class="bg-white" v-if="orders !== undefined && orders.length > 0">
      <div class="py-16 sm:py-24">
        <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p class="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
        </div>

        <div class="mt-16">
          <h2 class="sr-only">Recent orders</h2>
          <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              <div v-for="order in orders
      .slice()
      .sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )" :key="order.number"
                class="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <h3 class="sr-only">
                  Order placed on
                  <time :datetime="order.createdDatetime">{{
      order.createdDate
    }}</time>
                </h3>

                <div class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                  <dl class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt class="font-medium text-gray-900">Order number</dt>
                      <dd class="mt-1 text-gray-500">{{ order.id }}</dd>
                    </div>
                    <div class="hidden sm:block">
                      <dt class="font-medium text-gray-900">Date placed</dt>
                      <dd class="mt-1 text-gray-500">
                        <time :datetime="order.createdAt">{{
      normalizeDateTime(order.createdAt, {
        showTime: false,
      })
    }}</time>
                      </dd>
                    </div>

                    <div v-if="order.payment_information">
                      <dt class="font-medium text-gray-900">Total amount</dt>
                      <dd class="mt-1 font-medium text-gray-900">
                        {{ order.payment_information.currencySymbol }}
                        {{ order.cost_details.total }}
                      </dd>
                      <dd>
                        ({{ order.payment_information.currencySymbol }}
                        {{ order.cost_details.tax }} VAT)
                      </dd>
                    </div>
                  </dl>

                  <Menu as="div" class="relative flex justify-end lg:hidden">
                    <div class="flex items-center">
                      <MenuButton class="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Options for order {{ order.id }}</span>
                        <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" />
                      </MenuButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                      <MenuItems
                        class="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                          <a :href="order.href" :class="[
      active
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-700',
      'block px-4 py-2 text-sm',
    ]">View</a>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                          <a :href="order.invoiceHref" :class="[
      active
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-700',
      'block px-4 py-2 text-sm',
    ]">Invoice</a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>

                  <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <router-link :to="'/account/order/detail/' + order.id"
                      class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span>View Order</span>
                      <span class="sr-only">{{ order.id }}</span>
                    </router-link>
                    <a @click="openInvoice(order.payment_information.invoiceUrl)"
                      class="cursor-pointer flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span>View Invoice</span>
                      <span class="sr-only">for order {{ order.id }}</span>
                    </a>
                  </div>
                </div>

                <!-- Products -->
                <h4 class="sr-only">Items</h4>
                <ul role="list" class="divide-y divide-gray-200" v-if="order.shopping_cart">
                  <li v-for="orderProductItem in order.shopping_cart.Products" :key="orderProductItem.product.id"
                    class="p-4 sm:p-6">
                    <div class="flex items-center sm:items-start">
                      <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                        <img :src="orderProductItem.product
        .ImagesWithAlternativeText[0].image.url
      " :alt="orderProductItem.product
        .ImagesWithAlternativeText[0].alt
      " class="h-full w-full object-cover object-center" />
                      </div>
                      <div class="ml-6 flex-1 text-sm">
                        <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                          <h5>{{ orderProductItem.product.name }}</h5>
                          <!--product name-->
                          <p class="mt-2 sm:mt-0">
                            {{ order.payment_information.currencySymbol }}
                            {{ orderProductItem.product.price }}
                          </p>
                          <!--product price-->
                        </div>
                        <div class="hidden text-gray-500 sm:mt-2 sm:block">
                          <p v-html="orderProductItem.product.description"></p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 sm:flex sm:justify-between">
                      <div class="flex items-center">
                        <CheckCircleIcon class="h-5 w-5 text-green-500" aria-hidden="true" />
                        <p class="ml-2 text-sm font-medium text-gray-500">
                          Delivered on
                          <time :datetime="order.createdAt">{{
      normalizeDateTime(order.createdAt, {
        showTime: false,
      })
    }}</time>
                        </p>
                      </div>

                      <div
                        class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                        <div class="flex flex-1 justify-center">
                          <router-link :to="'/product/' + orderProductItem.product.id"
                            class="whitespace-nowrap text-indigo-600 hover:text-indigo-500">View product</router-link>
                        </div>
                        <!-- <div class="flex flex-1 justify-center pl-4">
                        <a
                          href="#"
                          class="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                          >Buy again</a
                        >
                      </div> -->
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingSpinnerComponent />
    </div>
  </section>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { createGETRequestAsync } from "../../helpers/requestHelper";
import LoadingSpinnerComponent from "@/components/shared/LoadingSpinnerComponent.vue";

export default {
  name: "OrderHistoryComponent",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    EllipsisVerticalIcon,
    CheckCircleIcon,
    LoadingSpinnerComponent,
  },
  data() {
    return {
      // orders: [
      //   {
      //     number: "WU88191111",
      //     href: "#",
      //     invoiceHref: "#",
      //     createdDate: "Jul 6, 2021",
      //     createdDatetime: "2021-07-06",
      //     deliveredDate: "July 12, 2021",
      //     deliveredDatetime: "2021-07-12",
      //     total: "$160.00",
      //     products: [
      //       {
      //         id: 1,
      //         name: "Micro Backpack",
      //         description:
      //           "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
      //         href: "#",
      //         price: "$70.00",
      //         imageSrc:
      //           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
      //         imageAlt:
      //           "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
      //       },
      //       // More products...
      //     ],
      //   },
      //   // More orders...
      // ],
      orders: [],
    };
  },
  mounted() {
    this.getAllOrdersFromUserByCustomerId();
  },
  methods: {
    openInvoice(invoiceUrl) {
      console.log("🚀 ~ openInvoice ~ invoiceUrl", invoiceUrl);
      window.open(invoiceUrl, "_blank");
    },
    async getAllOrdersFromUserByCustomerId() {
      const response = await createGETRequestAsync(
        "/order-detail/get-all-orders-by-customer-id/" +
        this.$store.state.user.id
      );
      const orders = await response.json();
      console.log("🚀 ~ getAllOrdersFromUserByCustomerId ~ orders:", orders);
      this.orders = orders;
    },
    normalizeDateTime(
      dateTime,
      { useBelgianLocale = false, showTime = true } = {}
    ) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      if (showTime) {
        Object.assign(options, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

      const locale = useBelgianLocale ? "nl-BE" : "en-US";

      return new Date(dateTime).toLocaleString(locale, options);
    },
  },
};
</script>

<style scoped>
/* Your component's styles here */
</style>
