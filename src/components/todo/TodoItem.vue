<template>
  <div class="todo-item col-12 col-md-6 col-xl-4 mb-2">
    <div class="card">
      <div class="card-header">#{{ todo.category }}</div>
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
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>
