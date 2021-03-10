<template>
  <div class="row d-flex align-content-center justify-content-center">
    <Loading v-if="getPendingTodos" :status="getPendingTodos"></Loading>
    <Error v-else-if="getErrorTodos" :message="getErrorTodos"></Error>
    <template v-else>
      <template v-if="todos.length">
        <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id"></TodoItem>
      </template>
      <div v-else>List empty</div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "@/components/global/Loading";
import Error from "@/components/global/Error";
import TodoItem from "@/components/todo/TodoItem";

export default {
  name: "TodoList",
  components: { TodoItem, Error, Loading },
  data() {
    return {
      todos: [],
      limit: 6,
      page: 1,
      search: "",
      category: ""
    };
  },
  async created() {
    await this.fetchTodos({ categories: this.getCategories });

    const { query } = this.$route;
    this.handleURL(query);

    this.setTodos();
  },
  computed: {
    ...mapGetters("todos", ["getTodos", "getPendingTodos", "getErrorTodos"]),
    ...mapGetters("tools", ["getCategories"])
  },
  methods: {
    ...mapActions("todos", ["fetchTodos"]),
    ...mapActions("tools", ["setPagination"]),
    setTodos() {
      let todos = [...this.getTodos];

      if (this.search) {
        todos = todos.filter(
          todo =>
            todo.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      }

      if (this.category) {
        const categories = this.category.split(",");

        todos = todos.filter(todo =>
          categories.find(
            category =>
              todo.category.toLowerCase().indexOf(category.toLowerCase()) > -1
          )
        );
      }

      const start = (this.page - 1) * this.limit;
      const end = this.limit;

      this.setPagination({
        pagination: {
          currentPage: this.page,
          allPages: Math.ceil(todos.length / this.limit)
        }
      });

      this.todos = todos.splice(start, end);
    },

    handleURL(query) {
      if (query?.search) {
        this.search = query.search;
      }

      if (query?.page) {
        this.page = query.page;
      }

      if (query?.category) {
        this.category = query.category;
      }
    },

    resetParamsURL() {
      this.category = "";
      this.search = "";
      this.page = 1;
    }
  },
  watch: {
    $route({ query }) {
      this.resetParamsURL();
      this.handleURL(query);
      this.setTodos();
    }
  },
  unmounted() {
    this.todos = [];
  }
};
</script>
