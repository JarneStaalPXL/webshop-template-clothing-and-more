<template>
  <h1>Redirecting to backend ...</h1>
</template>

<script>
export default {
  name: "AdminView",
  data() {
    return {
      strapiProdUrl: import.meta.env.VITE_STRAPI_PRODUCTION_URL,
    };
  },
  beforeMount() {
    window.location.href = this.strapiProdUrl + "/admin";
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 20%;
  font-size: 2rem;
  color: #333;
  font-weight: 500;
}
</style>
