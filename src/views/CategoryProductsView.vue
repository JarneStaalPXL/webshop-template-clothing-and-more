<template>
  <CategoryProductsComponent
    :category="category"
    :mainCategory="mainCategory"
    :products="allProductsOfCategory"
  />
</template>

<script>
import CategoryProductsComponent from "../components/category/CategoryProductsComponent.vue";
export default {
  name: "CategoryView",
  components: {
    CategoryProductsComponent,
  },
  created() {
    this.updateRouteParams();
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateRouteParams();
      },
    },
  },
  data() {
    return {
      category: this.$route.params.category,
      mainCategory: this.$route.params.maincategory,
      allProductsOfCategory: [],
    };
  },
  created() {
    this.category = this.$route.params.category;
  },
  methods: {
    updateRouteParams() {
      this.category = this.$route.params.category;
      this.mainCategory = this.$route.params.maincategory;
    },
  },
};
</script>

<style></style>
