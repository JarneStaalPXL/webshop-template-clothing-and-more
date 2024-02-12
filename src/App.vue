<template>
  <div>
    <NotificationComponent />
    <!-- Wrap other components for transition -->
    <transition name="fade" mode="out-in">
      <div>
        <NavigationComponent />
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
        <FooterComponent />
      </div>
    </transition>
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

<style scoped>
/* Define enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
