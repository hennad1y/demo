<template>
  <div class="page">
    <Loading v-if="getPendingTodos" :status="getPendingTodos"></Loading>
    <Error v-else-if="getErrorTodos" :message="getErrorTodos"></Error>
    <template v-else>
      <template v-if="todo">
        <a href="#" @click.prevent="$router.go(-1)" class="d-flex mt-2 mb-3"
          >Back</a
        >
        <TodoItem :custom-card="true">
          <template v-slot:customCard>
            <div class="row">
              <div class="card col-12">
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">#{{ todo.category }}</li>
                  </ul>
                  <h5 class="card-title">{{ todo.title }}</h5>
                  <p class="card-text">{{ todo.body }}</p>
                  <a
                    href="#"
                    class="card-link"
                    @click.prevent="toggleModal({ status: true })"
                    >Edit</a
                  >
                </div>
              </div>
            </div>
          </template>
        </TodoItem>
        <TodoModal
          v-if="showModal"
          :show-modal="showModal"
          @toggleModal="toggleModal"
          @newTodo="newTodo"
          :todo="todo"
          modal-title="Edit Todo"
        />
      </template>
      <div v-else>Not Found</div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "@/components/global/Loading";
import Error from "@/components/global/Error";
import TodoItem from "@/components/todo/TodoItem";
import TodoModal from "@/components/todo/TodoModal";

export default {
  name: "Todo",
  components: { TodoModal, TodoItem, Error, Loading },
  data() {
    return {
      todo: null,
      showModal: false
    };
  },
  async created() {
    const { todoId } = this.$route.params;

    if (this.getTodos.length) {
      this.todo = this.getTodos.find(todo => +todo.id === +todoId);
    }

    if (!this.todo) {
      const todo = await this.fetchTodoById({ todoId });
      todo.category = this.setCategory();
      this.todo = todo;
    }
  },
  computed: {
    ...mapGetters("todos", ["getTodos", "getPendingTodos", "getErrorTodos"]),
    ...mapGetters("tools", ["getCategories"])
  },
  methods: {
    ...mapActions("todos", ["fetchTodoById", "refreshTodos"]),

    setCategory() {
      return this.getCategories[
        this.getRandomArbitrary(0, this.getCategories.length - 1)
      ];
    },

    getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    toggleModal({ status }) {
      this.showModal = status;
    },

    newTodo({ newTodo }) {
      if (this.getTodos.length) {
        const todos = this.getTodos.map(todo => {
          if (todo.id === newTodo.id) return newTodo;
          return todo;
        });

        this.refreshTodos({ todos });
      }

      this.todo = newTodo;

      this.toggleModal({ status: false });
    }
  }
};
</script>
