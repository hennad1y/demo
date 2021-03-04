<template>
  <div class="spinner-border" role="status" v-if="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    status: {
      type: Boolean,
      required: true
    }
  }
};
</script>
