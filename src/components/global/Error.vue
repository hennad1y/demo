<template>
  <div class="text-danger">{{ message }}</div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>
