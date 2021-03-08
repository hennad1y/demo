<template>
  <div class="page d-flex flex-column flex-wrap">
    <TodoSearch />
    <TodoPagination />
    <TodoList />
  </div>
</template>

<script>
import TodoList from "@/components/todo/TodoList";
import TodoPagination from "@/components/todo/TodoPagination";
import TodoSearch from "@/components/todo/TodoSearch";

export default {
  name: "Home",
  components: { TodoSearch, TodoPagination, TodoList }
};
</script>
