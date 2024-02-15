<template>
  <div class="py-6 sm:py-0">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div
          class="px-4 sm:p-6"
          :style="{ paddingBottom: '4px' }"
          v-if="$route.query.name"
        >
          You searched for <b>{{ $route.query.name }}</b>
        </div>

        <div class="px-4 py-5 sm:p-6">
          <!-- Adjusted grid to lg:grid-cols-3 for 3 products per row on lg screens -->

          <div
            class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
          >
            <div v-for="product in products" :key="product.id" class="group relative">
              <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
              >
                <img
                  :src="product.images[0].src"
                  :alt="product.images[0].alt"
                  class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div class="mt-4">
                <h3 class="text-sm text-gray-700">
                  <router-link :to="'/product/' + product.id">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {{ product.name }}
                  </router-link>
                </h3>
                <p class="text-sm font-medium text-gray-900 mt-2">
                  {{ $store.state.currency.symbol }} {{ product.price }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-3 italic" v-if="products.length <= 0">
            No products found with those filters
          </div>
        </div>

        <div class="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <nav class="flex items-center justify-between" aria-label="Pagination">
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  (currentPage - 1) * productsPerPage + 1
                }}</span>
                to
                <span class="font-medium">{{
                  Math.min(currentPage * productsPerPage, products.length)
                }}</span>
                of <span class="font-medium">{{ products.length }}</span> results
              </p>
            </div>
            <div class="flex flex-1 justify-between sm:justify-end">
              <button
                @click="onPreviousPage"
                class="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
              <button
                @click="onNextPage"
                :disabled="currentPage >= totalPages"
                class="relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                :class="{ 'cursor-not-allowed opacity-50': currentPage >= totalPages }"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilteredProductsListComponent",
  props: {
    products: Array,
    currentPage: Number,
    productsPerPage: Number,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
  },
  methods: {
    onPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit("changePage", this.currentPage - 1);
      }
    },
    onNextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("changePage", this.currentPage + 1);
      }
    },
  },
};
</script>
