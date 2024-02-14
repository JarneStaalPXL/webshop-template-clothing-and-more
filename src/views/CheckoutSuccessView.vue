<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">Checkout Success</h1>
    <p class="text-lg mb-2">
      Your order with ID: {{ orderNumberId }} has been successfully placed.
    </p>
    <p class="text-lg">Thank you for shopping with us!</p>
  </div>
</template>

<script>
export default {
  props: {
    orderNumberId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
