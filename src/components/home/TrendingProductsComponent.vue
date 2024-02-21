<template>
  <section aria-labelledby="trending-heading">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
      <div
        class="md:flex md:items-center md:justify-between"
        v-if="$store.state.products && $store.state.products.length > 0"
      >
        <h2
          id="favorites-heading"
          class="text-2xl font-bold tracking-tight text-gray-900"
        >
          Trending Products
        </h2>
        <!-- <router-link :to=""
          
          class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
        >
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </router-link> -->
      </div>

      <div
        class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
      >
        <router-link
          :to="'/product/' + product.id"
          v-for="product in $store.state.products.slice(4, 8)"
          :key="product.id"
        >
          <div class="group relative">
            <div
              class="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80"
            >
              <img
                :src="
                  product.ImagesWithAlternativeText[0]
                    ? product.ImagesWithAlternativeText[0].images[0].url
                    : 'https://via.placeholder.com/300'
                "
                :alt="
                  product.ImagesWithAlternativeText[0]
                    ? product.ImagesWithAlternativeText[0].alt
                    : ''
                "
                class="h-full w-full object-cover object-center"
              />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">
              <a :href="product.href">
                <span class="absolute inset-0" />
                {{ product.name }}
              </a>
            </h3>
            <p class="mt-1 text-sm font-medium text-gray-900">
              {{ $store.state.currency.symbol }} {{ product.price }}
            </p>
          </div>
        </router-link>
      </div>

      <!-- <div class="mt-8 text-sm md:hidden">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "TrendingProductsComponent",
  data() {
    return {};
  },
};
</script>

<style></style>
