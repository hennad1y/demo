<template>
  <div :class="buildClass">
    <div v-if="todo" class="card">
      <div class="card-header">#{{ todo.category }}</div>
      <div class="card-body">
        <h5 class="card-title">{{ todo.title }}</h5>
        <p class="card-text">{{ todo.body }}</p>
        <router-link :to="`/todo/${todo.id}`" class="btn btn-primary">
          More
        </router-link>
      </div>
    </div>
    <slot v-else name="customCard" />
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      default: () => undefined
    }
  },
  computed: {
    buildClass() {
      return {
        "todo-item": true,
        "col-12": true,
        "col-md-6": this.todo,
        "col-xl-4": this.todo,
        "mb-2": true
      };
    }
  }
};
</script>
