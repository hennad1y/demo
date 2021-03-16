<template>
  <div id="app">
    <Form @submit="onSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <Field
          class="form-control"
          id="title"
          type="text"
          name="title"
          v-model="title"
          :rules="requiredField"
        />
        <ErrorMessage class="text-danger" name="title" />
      </div>

      <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <Field
          v-model="body"
          id="body"
          name="body"
          v-slot="{ field }"
          :rules="requiredField"
        >
          <textarea v-bind="field" class="form-control" />
        </Field>
        <ErrorMessage class="text-danger" name="body" />
      </div>

      <div class="mb-3">
        <label for="categories" class="form-label">Categories</label>
        <div id="categories">
          <div
            class="mb-3 form-check"
            v-for="(item, index) in getCategories"
            :key="index"
          >
            <Field
              v-model="category"
              v-slot="{ field }"
              name="category"
              type="radio"
              :value="item"
              :rules="requiredField"
            >
              <label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="category"
                  v-bind="field"
                  :value="item"
                />
                {{ item }}
              </label>
            </Field>
          </div>
          <ErrorMessage class="text-danger" name="category" />
        </div>
      </div>

      <button class="btn btn-primary ml-auto d-flex">Save</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapGetters } from "vuex";

export default {
  name: "TodoForm",
  props: {
    copyTodo: {
      type: Object
    }
  },
  emits: ["newTodo"],
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      title: "",
      body: "",
      category: ""
    };
  },
  computed: {
    ...mapGetters("tools", ["getCategories"])
  },
  methods: {
    onSubmit() {
      const { title, body, category } = this;
      const newTodo = { ...this.copyTodo, title, body, category };

      // there should be a request ("put" or "post")

      // if error -> show message error

      // if success
      this.$emit("newTodo", { newTodo });
    },

    requiredField(value) {
      if (!value) {
        return "This field is required";
      }

      return true;
    }
  },
  watch: {
    copyTodo(todo) {
      const { title = "", body = "", category = "" } = todo;

      this.title = title;
      this.body = body;
      this.category = category;
    }
  }
};
</script>
