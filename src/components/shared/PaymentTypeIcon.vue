<template>
    <div>
      <component :is="paymentTypeIcon" />
    </div>
  </template>
  
  <script>
  import { markRaw } from 'vue';
  import VisaIcon from '@/assets/cardTypeIcons/VisaIcon.vue';
  import MastercardIcon from '@/assets/cardTypeIcons/MastercardIcon.vue';
  import MaestroIcon from '@/assets/cardTypeIcons/MaestroIcon.vue';
  
  export default {
    props: {
      paymentType: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        paymentTypeIcon: null,
      };
    },
    mounted() {
      this.paymentTypeIcon = markRaw(this.getPaymentTypeIcon());
    },
    methods: {
      getPaymentTypeIcon() {
        switch (this.paymentType) {
          case 'visa':
            return VisaIcon;
          case 'mastercard':
            return MastercardIcon;
          case 'maestro':
            return MaestroIcon;
          default:
            return null;
        }
      },
    },
  };
  </script>
  