<template>
  <div>
    <NotificationComponent />
    <NavigationComponent />
    <router-view></router-view>
    <footer-component />
  </div>
</template>

<script>
import NavigationComponent from "./components/shared/NavigationComponent.vue";
import FooterComponent from "./components/shared/FooterComponent.vue";
import NotificationComponent from "./components/shared/NotificationComponent.vue";
export default {
  name: "App",
  components: {
    FooterComponent,
    NavigationComponent,
    NotificationComponent,
  },
};
</script>

<style scoped></style>
