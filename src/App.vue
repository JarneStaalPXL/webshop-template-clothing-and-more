<template>
  <div>
    <NavigationComponent />
    <router-view></router-view>
    <footer-component />
  </div>
</template>

<script>
import NavigationComponent from "./components/shared/NavigationComponent.vue";
import FooterComponent from "./components/shared/FooterComponent.vue";
export default {
  name: "App",
  components: {
    FooterComponent,
    NavigationComponent,
  },
};
</script>

<style scoped></style>
