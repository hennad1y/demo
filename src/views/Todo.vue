<template>
  <div class="page">
    <Loading v-if="getPendingTodos" :status="getPendingTodos"></Loading>
    <Error v-if="getErrorTodos" :message="getErrorTodos"></Error>
    <template v-if="todo">
      <router-link to="/">Back</router-link>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ todo.title }}</h5>
          <p class="card-text">{{ todo.body }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "@/components/global/Loading";
import Error from "@/components/global/Error";

export default {
  name: "Todo",
  components: { Error, Loading },
  data() {
    return {
      todo: null
    };
  },
  async created() {
    const { todoId } = this.$route.params;

    if (this.getTodos.length) {
      this.todo = this.getTodos.find(todo => +todo.id === +todoId);
    }

    if (!this.todo) {
      this.todo = await this.fetchTodoById({ todoId });
    }
  },
  computed: {
    ...mapGetters("todos", ["getTodos", "getPendingTodos", "getErrorTodos"])
  },
  methods: {
    ...mapActions("todos", ["fetchTodoById"])
  }
};
</script>
