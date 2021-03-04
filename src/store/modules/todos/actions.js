import { API_URL, ERROR_MESSAGE } from "@/config";

const actions = {
  async fetchTodos({ commit }) {
    commit("setPendingTodos", { status: true });

    try {
      const todos = await fetch(`${API_URL}/posts`).then(res => {
        if (!res.ok) throw Error(ERROR_MESSAGE);
        return res.json();
      });

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
