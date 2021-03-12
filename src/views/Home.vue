<template>
  <div class="page d-flex flex-column flex-wrap">
    <div class="row mt-3">
      <div class="col-12 col-md-4 col-xl-3">
        <TodoSearch />
        <TodoCategories />
      </div>
      <div class="col-12 col-md-8 col-xl-9">
        <div class="page-top">
          <TodoPagination />
        </div>
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/todo/TodoList";
import TodoPagination from "@/components/todo/TodoPagination";
import TodoSearch from "@/components/todo/TodoSearch";
import TodoCategories from "@/components/todo/TodoCategories";

export default {
  name: "Home",
  components: { TodoCategories, TodoSearch, TodoPagination, TodoList }
};
</script>
