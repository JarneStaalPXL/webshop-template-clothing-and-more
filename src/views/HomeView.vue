<template>
  <div>
    <HeroComponent />
    <TrendingProductsComponent />
    <PerksComponent />
  </div>
</template>

<script>
import HeroComponent from "../components/home/HeroComponent.vue";
import NavigationComponent from "../components/shared/NavigationComponent.vue";
import TrendingProductsComponent from "../components/home/TrendingProductsComponent.vue";
import PerksComponent from "../components/home/PerksComponent.vue";
export default {
  name: "HomeView",
  components: {
    NavigationComponent,
    HeroComponent,
    TrendingProductsComponent,
    PerksComponent,
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
