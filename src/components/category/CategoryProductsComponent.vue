<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        {{ capitalizeFirstLetter(mainCategory) }} / {{ capitalizeFirstLetter(category) }}
      </h2>

      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <router-link v-for="product in products" :key="product.id" :to="'/product/' + product.id">
          <div class="group relative">
            <div
              class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img :src="product.ImagesWithAlternativeText[0]
          ? product.ImagesWithAlternativeText[0].images[0].url
          : 'https://via.placeholder.com/300'
          " :alt="product.ImagesWithAlternativeText[0]
          ? product.ImagesWithAlternativeText[0].alt
          : ''
          " class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a :href="product.href">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <!-- <p class="mt-1 text-sm text-gray-500">{{ product.colors }}</p> -->
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{ $store.state.currency.symbol }} {{ product.price }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "../../helpers/string-modification";
export default {
  name: "CategoryProducts",
  props: {
    mainCategory: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    capitalizeFirstLetter,
  },
};
</script>

<style></style>
