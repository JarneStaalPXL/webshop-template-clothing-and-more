<template>
  <TransitionRoot
    :show="$store.state.showSearchDialog"
    as="template"
    @after-leave="query = ''"
    appear
  >
    <Dialog as="div" class="relative z-50" @close="$store.state.showSearchDialog = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-40">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  @input="query = $event.target.value"
                  @keydown.enter="pushToProductsWithQuery(query)"
                />
              </div>

              <ComboboxOptions
                v-if="filteredProducts.length > 0"
                static
                class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                <ComboboxOption
                  v-for="product in filteredProducts"
                  :key="product.id"
                  :value="product"
                  as="template"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      'cursor-pointer select-none px-4 py-2',
                      active && 'bg-indigo-600 text-white',
                    ]"
                  >
                    {{ product.name }}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>

              <p
                v-if="query !== '' && filteredProducts.length === 0"
                class="p-4 text-sm text-gray-500"
              >
                Press Enter to search for "{{ query }}"
              </p>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default {
  components: {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    MagnifyingGlassIcon,
  },
  data() {
    return {
      query: "",
      filteredProducts: [],
    };
  },
  watch: {
    query(newQuery, oldQuery) {
      // Optionally, you can add a debounce here manually or use a library like lodash
      if (newQuery !== oldQuery) {
        this.filteredProducts = this.filterProducts(newQuery);
      }
    },
  },
  mounted() {
    // Optionally, fetch products when the component mounts if needed
    this.filterProducts(this.query);
  },
  methods: {
    pushToProductsWithQuery(query) {
      this.$router.push(`/products?name=${query}`);
      this.$store.state.showSearchDialog = false;
    },
    async filterProducts(query) {
      // Assuming this.$store.state.products is the reactive data source
      let products = await this.$store.dispatch(
        "FIND_PRODUCTS_FROM_ALL_LISTS_BY_NAME",
        query
      );
      this.filteredProducts = products; // Assign the result to the data property
    },
    onSelect(product) {
      this.$router.push(`/product/${product.id}`);
      this.$store.state.showSearchDialog = false;
    },
  },
};
</script>
