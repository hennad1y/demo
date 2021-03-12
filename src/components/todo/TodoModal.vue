<template>
  <div class="modal todo-modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            X
          </button>
        </div>
        <div class="modal-body">
          <TodoForm :copyTodo="copyTodo" @newTodo="newTodo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import TodoForm from "@/components/todo/TodoForm";

export default {
  name: "TodoModal",
  components: { TodoForm },
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    todo: {
      type: Object
    },
    modalTitle: {
      type: String,
      required: true
    }
  },
  emits: ["newTodo", "toggleModal"],
  data() {
    return {
      modal: null,
      copyTodo: {}
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, { keyboard: false });
    this.$refs.modal.addEventListener("hide.bs.modal", this.eventCloseModal);
    this.copyTodo = { ...this.todo };
    this.modal.show();
  },
  methods: {
    closeModal() {
      this.modal.hide();
    },

    eventCloseModal() {
      this.$emit("toggleModal", { status: false });
      this.copyTodo = {};
    },

    newTodo({ newTodo }) {
      this.$emit("newTodo", { newTodo });
      this.closeModal();
    }
  },
  beforeUnmount() {
    this.$refs.modal.removeEventListener("hide.bs.modal", this.eventCloseModal);
  },
  unmounted() {
    this.modal.dispose();
  }
};
</script>
