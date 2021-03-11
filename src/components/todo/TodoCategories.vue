<template>
  <div class="todo-categories mt-4">
    <h4>Categories</h4>
    <div v-if="selected.length" class="mb-3 selected">
      <div
        class="badge bg-dark text-wrap mr-1"
        v-for="(category, index) in selected"
        :key="index"
      >
        {{ category }}
        <span class="badge bg-light text-dark" @click="setCategory(category)"
          >X</span
        >
      </div>
    </div>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li
          v-for="(category, index) in getCategories"
          :key="index"
          class="list-group-item"
          @click="setCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TodoCategories",
  data() {
    return {
      selected: []
    };
  },
  created() {
    const { query } = this.$route;

    if (query?.category) {
      this.selected = query.category.split(",");
    }
  },
  computed: {
    ...mapGetters("tools", ["getCategories"])
  },
  methods: {
    setCategory(category) {
      const { query } = this.$route;

      const index = this.selected.findIndex(
        selectedCategory => selectedCategory === category
      );

      index > -1
        ? this.selected.splice(index, 1)
        : this.selected.push(category);

      this.$router.push({
        query: {
          ...query,
          category: this.selected.length ? this.selected.toString() : undefined,
          page: 1
        }
      });
    }
  }
};
</script>
