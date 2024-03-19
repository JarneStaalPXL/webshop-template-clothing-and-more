<template>
 <div>
  <OrderHistory/>
 </div>
</template>

<script>
import OrderHistory from "@/components/account/OrderHistoryComponent.vue";
export default {
  name: "AccountView",
  components: {
    OrderHistory,
  },
  data() {
    return {
      // Define your component state here
    
      // Define any other data properties you need
    };
  },
  methods: {
    // Define methods to handle component logic, such as menu actions
  },
};
</script>
