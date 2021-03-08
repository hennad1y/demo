import { createStore } from "vuex";

import todos from "./modules/todos";
import tools from "./modules/tools";

export default createStore({
  modules: {
    todos,
    tools
  }
});
