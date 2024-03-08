<template>
  <div class="app-container">
    <NotificationComponent />
    <transition name="fade" mode="out-in">
      <div class="content-wrap">
        <NavigationComponent v-if="$store.state.showNavigationComponent" />
        <SearchComponent />
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </transition>
    <FooterComponent v-if="$store.state.showFooterComponent" />
  </div>
</template>

<script>
import SearchComponent from "./components/shared/SearchComponent.vue";
import NavigationComponent from "./components/shared/NavigationComponent.vue";
import FooterComponent from "./components/shared/FooterComponent.vue";
import NotificationComponent from "./components/shared/NotificationComponent.vue";

export default {
  name: "App",
  components: {
    FooterComponent,
    NavigationComponent,
    NotificationComponent,
    SearchComponent,
  },
  beforeMount() {
    // this.$store.dispatch("LOAD_PRODUCTS_FROM_STRAPI");
  },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content-wrap {
  flex: 1;
}

/* Define enter and leave transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
