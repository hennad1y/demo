const getters = {
  getTodos(state) {
    return state.todos;
  },

  getPendingTodos(state) {
    return state.pendingTodos;
  },

  getErrorTodos(state) {
    return state.errorTodos;
  }
};

export default getters;
