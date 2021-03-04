<template>
  <Loading v-if="getPendingTodos" :status="getPendingTodos"></Loading>
  <Error v-else-if="getErrorTodos" :message="getErrorTodos"></Error>
  <template v-else>
    <template v-if="todos.length">
      <Todo v-for="todo in todos" :todo="todo" :key="todo.id"></Todo>
    </template>
    <div v-else>List empty</div>
  </template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "@/components/global/Loading";
import Error from "@/components/global/Error";
import Todo from "@/components/todo/Todo";

export default {
  name: "TodoList",
  components: { Todo, Error, Loading },
  data() {
    return {
      todos: []
    };
  },
  async created() {
    await this.fetchTodos();
    this.todos = this.getTodos;
  },
  computed: {
    ...mapGetters("todos", ["getTodos", "getPendingTodos", "getErrorTodos"])
  },
  methods: {
    ...mapActions("todos", ["fetchTodos"])
  }
};
</script>
