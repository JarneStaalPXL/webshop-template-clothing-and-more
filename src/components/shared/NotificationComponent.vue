<template>
  <div
    aria-live="assertive"
    id="notificationComponent"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="$store.state.notification.show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Icon can be replaced or modified based on props if needed -->
                <CheckCircleIcon
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                  v-if="$store.state.notification.type === 'success'"
                />
                <CheckCircleIcon
                  class="h-6 w-6 text-red-400"
                  aria-hidden="true"
                  v-if="$store.state.notification.type === 'error'"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ $store.state.notification.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ $store.state.notification.message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="closeNotification"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">{{ $store.state.notification.closeButton }}</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    CheckCircleIcon,
    XMarkIcon,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closeNotification() {
      this.$store.commit("closeNotification");
    },
  },
};
</script>

<style>
#notificationComponent {
  z-index: 9999;
}
</style>
