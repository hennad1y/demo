<template>
  <div class="col-3 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ todo.title }}</h5>
        <p class="card-text">{{ todo.body }}</p>
        <router-link :to="`/todo/${todo.id}`" class="btn btn-primary">
          More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>
