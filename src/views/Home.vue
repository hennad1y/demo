<template>
  <div class="page d-flex flex-wrap align-items-center justify-content-center">
    <TodoList />
  </div>
</template>

<script>
import TodoList from "@/components/todo/TodoList";

export default {
  name: "Home",
  components: { TodoList }
};
</script>
