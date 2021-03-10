import { API_URL, ERROR_MESSAGE } from "@/config";

const actions = {
  async fetchTodos({ commit }, { categories = null }) {
    commit("setPendingTodos", { status: true });

    try {
      let todos = await fetch(`${API_URL}/posts`).then(res => {
        if (!res.ok) throw Error(ERROR_MESSAGE);
        return res.json();
      });

      if (categories) {
        const getRandomArbitrary = (min, max) => {
          return Math.round(Math.random() * (max - min) + min);
        };

        todos = todos.map(todo => {
          const random = getRandomArbitrary(0, categories.length - 1);
          todo.category = categories[random];
          return todo;
        });
      }

      commit("setTodos", { todos });
    } catch (err) {
      const { message } = err;
      commit("setErrorTodos", { message });
    } finally {
      commit("setPendingTodos", { status: false });
    }
  },

  async fetchTodoById({ commit }, { todoId }) {
    commit("setPendingTodos", { status: true });

    try {
      return await fetch(`${API_URL}/posts/${todoId}`).then(res => {
        if (!res.ok) throw Error(ERROR_MESSAGE);
        return res.json();
      });
    } catch (err) {
      const { message } = err;
      commit("setErrorTodos", { message });
    } finally {
      commit("setPendingTodos", { status: false });
    }
  }
};

export default actions;
