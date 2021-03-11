<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
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
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "TodoModal",
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  emits: ["closeModal"],
  data() {
    return {
      modal: null
    };
  },
  mounted() {
    const modal = document.querySelector(".modal");

    this.modal = new Modal(modal, { keyboard: false });

    modal.addEventListener("hide.bs.modal", () => {
      this.$emit("closeModal");
    });
  },
  methods: {
    closeModal() {
      this.modal.hide();
    }
  },
  watch: {
    showModal(status) {
      if (status) {
        this.modal.show();
      }
    }
  },
  unmounted() {
    this.modal.dispose();
  }
};
</script>
