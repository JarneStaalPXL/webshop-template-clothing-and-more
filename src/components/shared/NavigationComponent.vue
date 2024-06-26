<template>
  <div class="bg-white z-10">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="openMobile">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="openMobile = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="dialog-panel-classname relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="openMobile = false"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      as="template"
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                        >
                          <router-link to="/" class="cursor-pointer">
                            <img
                              :src="item.imageSrc"
                              :alt="item.imageAlt"
                              class="object-cover object-center"
                            />
                          </router-link>
                        </div>
                        <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-900"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        role="list"
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                      >
                        <li
                          v-for="item in section.items"
                          :key="item.name"
                          class="flow-root"
                        >
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{
                            item.name
                          }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{
                    page.name
                  }}</a>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <router-link
                    v-if="!$store.state.isLoggedIn"
                    to="/login"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >Sign in</router-link
                  >
                </div>
                <div class="flow-root">
                  <router-link
                    v-if="!$store.state.isLoggedIn"
                    to="/register"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >Create account</router-link
                  >
                </div>

                <div class="flow-root">
                  <!-- <AccountDropdownComponent /> -->
                  <!--TODO: Create a mobile version of this-->
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <div class="lg:flex">
                  <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
                    <Listbox as="div" @update:model-value="setSelectedCurrency">
                      <div class="relative mt-2">
                        <ListboxButton
                          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <span class="block truncate"
                            >{{ selected.symbol }} ({{ selected.name }})</span
                          >
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
                              v-for="currency in $store.state.currencies"
                              :key="currency.id"
                              :value="currency"
                              v-slot="{ active, selected }"
                            >
                              <li
                                :class="[
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-8 pr-4',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-semibold' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ currency.name }}</span
                                >

                                <span
                                  v-if="selected"
                                  :class="[
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
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
                    <!-- <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span> -->
                  </a>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white" id="navbar">
      <!-- Top bar -->
      <p
        v-if="freeShippingAbove"
        class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
      >
        Get free delivery on orders over {{ $store.state.currency.symbol }}
        {{ freeShippingAbove }}
      </p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              @click="openMobile = true"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <router-link to="/">
                <span class="sr-only">Tailwind Webshop</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </router-link>
            </div>

            <!-- This stays false for some reason -->
            <!-- Flyout menus -->

            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div class="relative flex">
                    <PopoverButton
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                      ]"
                      >{{ category.name }}</PopoverButton
                    >
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <PopoverPanel
                      class="absolute inset-x-0 top-full text-sm text-gray-500"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                                >
                                  <img
                                    :src="item.imageSrc"
                                    :alt="item.imageAlt"
                                    class="object-cover object-center"
                                  />
                                </div>
                                <a
                                  :href="item.href"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    class="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                            >
                              <div
                                v-for="section in category.sections"
                                :key="section.name"
                              >
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-900"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  role="list"
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in section.items"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a
                                      :href="
                                        '/category/' +
                                        navigation.categories
                                          .find((c) => c.name === category.name)
                                          .name.toLowerCase() +
                                        '/' +
                                        item.name.toLowerCase()
                                      "
                                      class="hover:text-gray-800 cursor-pointer"
                                    >
                                      {{ item.name }} {{ section.name }}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <a
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :href="page.href"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</a
                >
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <router-link
                  v-if="!$store.state.isLoggedIn"
                  to="/login"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</router-link
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <router-link
                  v-if="!$store.state.isLoggedIn"
                  to="/register"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</router-link
                >
                <AccountDropdownComponent v-if="$store.state.isLoggedIn" />
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
                  <Listbox as="div" @update:model-value="setSelectedCurrency">
                    <div class="relative">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <span class="block truncate"
                          >{{ $store.state.currency.symbol }} ({{
                            $store.state.currency.code
                          }})</span
                        >
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
                            v-for="currency in $store.state.currencies"
                            :key="currency.code"
                            :value="currency"
                            v-slot="{ active, selected }"
                          >
                            <li
                              :class="[
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-8 pr-4',
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-semibold' : 'font-normal',
                                  'block truncate',
                                ]"
                                >{{ currency.code }}</span
                              >

                              <span
                                v-if="selected"
                                :class="[
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
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
                  <!-- <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span> -->
                </a>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a
                  @click="$store.state.showSearchDialog = true"
                  class="p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <router-link to="/cart" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span
                    class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                    >{{ $store.state.cart.length }}</span
                  >
                  <span class="sr-only">items in cart, view bag</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
  Listbox,
  ListboxOption,
  ListboxOptions,
  ListboxLabel,
  ListboxButton,
} from "@headlessui/vue";

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/outline";
import UserIcon from "../../assets/icons/UserIcon.vue";
import AccountDropdownComponent from "../account/AccountDropdownComponent.vue";

export default {
  name: "NavigationComponent",
  components: {
    AccountDropdownComponent,
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TransitionChild,
    TransitionRoot,
    Listbox,
    ListboxOption,
    ListboxOptions,
    ListboxLabel,
    ListboxButton,
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
    CheckIcon,
    ChevronUpDownIcon,
    UserIcon,
  },
  created() {
    this.$router.afterEach(() => {
      this.open = false;
    });
  },
  data() {
    return {
      freeShippingAbove: import.meta.env.VITE_SHIPPING_FREE_ABOVE,
      open: false,
      openMobile: false,
      navigation: {
        categories: [
          {
            id: "women",
            name: "Women",
            featured: [
              {
                name: "New Arrivals",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                imageAlt:
                  "Models sitting back to back, wearing Basic Tee in black and bone.",
              },
              {
                name: "Basic Tees",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                imageAlt:
                  "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
              },
            ],
            sections: [
              {
                id: "clothing",
                name: "Clothing",
                items: [
                  { name: "Tops" },
                  { name: "Dresses" },
                  { name: "Pants" },
                  { name: "Denim" },
                  { name: "Sweaters" },
                  { name: "T-Shirts" },
                  { name: "Jackets" },
                  { name: "Activewear" },
                  { name: "Browse All" },
                ],
              },
              {
                id: "accessories",
                name: "Accessories",
                items: [
                  { name: "Watches" },
                  { name: "Wallets" },
                  { name: "Bags" },
                  { name: "Sunglasses" },
                  { name: "Hats" },
                  { name: "Belts" },
                ],
              },
              {
                id: "brands",
                name: "Brands",
                items: [
                  { name: "Full Nelson" },
                  { name: "My Way" },
                  { name: "Re-Arranged" },
                  { name: "Counterfeit" },
                  { name: "Significant Other" },
                ],
              },
            ],
          },
          {
            id: "men",
            name: "Men",
            featured: [
              {
                name: "New Arrivals",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                imageAlt:
                  "Drawstring top with elastic loop closure and textured interior padding.",
              },
              {
                name: "Artwork Tees",
                href: "#",
                imageSrc:
                  "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                imageAlt:
                  "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
              },
            ],
            sections: [
              {
                id: "clothing",
                name: "Clothing",
                items: [
                  { name: "Tops", href: "#" },
                  { name: "Pants", href: "#" },
                  { name: "Sweaters", href: "#" },
                  { name: "T-Shirts", href: "#" },
                  { name: "Jackets", href: "#" },
                  { name: "Activewear", href: "#" },
                  { name: "Browse All", href: "#" },
                ],
              },
              {
                id: "accessories",
                name: "Accessories",
                items: [
                  { name: "Watches", href: "#" },
                  { name: "Wallets", href: "#" },
                  { name: "Bags", href: "#" },
                  { name: "Sunglasses", href: "#" },
                  { name: "Hats", href: "#" },
                  { name: "Belts", href: "#" },
                ],
              },
              {
                id: "brands",
                name: "Brands",
                items: [
                  { name: "Re-Arranged", href: "#" },
                  { name: "Counterfeit", href: "#" },
                  { name: "Full Nelson", href: "#" },
                  { name: "My Way", href: "#" },
                ],
              },
            ],
          },
        ],
        pages: [
          { name: "Company", href: "#" },
          { name: "Stores", href: "#" },
        ],
      },
    };
  },
  methods: {
    setSelectedCurrency(value) {
      this.selected = value;
      this.$store.commit("setCurrency", value);
    },
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  z-index: 11;
  :focus {
    outline: none !important;
  }
}

/* Increase z-index for DialogPanel if needed */
.dialog-panel-classname {
  z-index: 50; /* This is just an example. Adjust the value as needed. */
}
</style>
