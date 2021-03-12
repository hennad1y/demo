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
  <template v-if="teleport">
    <Teleport to=".page-top">
      <a
        href="#"
        class="card-link ml-auto"
        @click.prevent="toggleModal({ status: true })"
      >
        Create todo
      </a>
    </Teleport>
    <Teleport to="body">
      <TodoModal
        v-if="showModal"
        :show-modal="showModal"
        @toggleModal="toggleModal"
        @newTodo="newTodo"
        modal-title="Create Todo"
      />
    </Teleport>
  </template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "@/components/global/Loading";
import Error from "@/components/global/Error";
import TodoItem from "@/components/todo/TodoItem";
import TodoModal from "@/components/todo/TodoModal";

export default {
  name: "TodoList",
  components: { TodoModal, TodoItem, Error, Loading },
  data() {
    return {
      todos: [],
      limit: 6,
      page: 1,
      search: "",
      category: "",
      showModal: false,
      teleport: false
    };
  },
  async created() {
    if (!this.getTodos.length) {
      await this.fetchTodos({ categories: this.getCategories });
    }

    const { query } = this.$route;

    this.resetParamsURL();
    this.handleURL(query);
    this.setTodos();
  },
  mounted() {
    this.teleport = true;
  },
  computed: {
    ...mapGetters("todos", ["getTodos", "getPendingTodos", "getErrorTodos"]),
    ...mapGetters("tools", ["getCategories"])
  },
  methods: {
    ...mapActions("todos", ["fetchTodos", "refreshTodos"]),
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
    },

    toggleModal({ status }) {
      this.showModal = status;
    },

    newTodo({ newTodo }) {
      newTodo = {
        ...newTodo,
        id: this.getTodos.length + 1,
        userId: this.getTodos.length + 1
      };

      const todos = this.getTodos;
      todos.push(newTodo);

      this.refreshTodos({ todos });
      this.toggleModal({ status: false });
      this.setTodos();
    }
  },
  watch: {
    $route({ name, query }) {
      if (name !== "Home") return;

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
