const mutations = {
  setTodos(state, { todos }) {
    state.todos = todos;
  },

  setPendingTodos(state, { status }) {
    state.pendingTodos = status;
  },

  setErrorTodos(state, { message }) {
    state.errorTodos = message;
  }
};

export default mutations;
