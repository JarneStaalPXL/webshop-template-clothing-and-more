<template>
  <CategoryProductsComponent
    :category="category"
    :mainCategory="mainCategory"
    :products="products"
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
      products: [
        {
          id: 1,
          name: "Basic Tee",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
          imageAlt: "Front of men's Basic Tee in black.",
          price: "35",
          color: "Black",
        },
        {
          id: 2,
          name: "Classic Hoodie",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
          imageAlt: "Front of men's Classic Hoodie in gray.",
          price: "65",
          color: "Gray",
        },
        {
          id: 3,
          name: "Slim Fit Jeans",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
          imageAlt: "Front of men's Slim Fit Jeans in blue.",
          price: "50",
          color: "Blue",
        },
        {
          id: 4,
          name: "Leather Belt",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
          imageAlt: "Leather Belt in brown.",
          price: "25",
          color: "Brown",
        },
      ],
    };
  },
  created() {
    this.category = this.$route.params.category;
    this.getProducts();
  },
  methods: {
    getProducts() {},
    updateRouteParams() {
      this.category = this.$route.params.category;
      this.mainCategory = this.$route.params.maincategory;
      this.getProducts();
    },
  },
};
</script>

<style></style>
