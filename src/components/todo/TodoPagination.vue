<template>
  <nav
    class="todo-pagination"
    v-if="pages.length > 1 && allPages >= currentPage"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="isDisabledPrev"
        @click="setPage(currentPage - 1)"
      >
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="isDisabledNext"
        @click="setPage(currentPage + 1)"
      >
        <a class="page-link" href="#" aria-label="Next" @click.prevent="">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, index) in pages"
        :key="index"
        :class="dynamicClasses(page)"
        @click="setPage(page)"
      >
        <a class="page-link" href="#" @click.prevent="">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TodoPagination",
  data() {
    return {
      pages: [],
      allPages: 1,
      currentPage: 1,
      position: 2
    };
  },
  computed: {
    ...mapGetters("tools", ["getPagination"]),

    isDisabledPrev() {
      return {
        disabled: this.currentPage === 1
      };
    },

    isDisabledNext() {
      return {
        disabled: this.currentPage === this.allPages
      };
    }
  },
  methods: {
    dynamicClasses(page) {
      if (page === "...") {
        return { disabled: true };
      }

      if (this.currentPage === +page) {
        return { active: true };
      }
    },

    setPage(page) {
      if (1 > page || page > this.allPages || page === "...") return;

      const { query } = this.$route;
      this.$router.push({ query: { ...query, page } });
    },

    buildPages(allPages) {
      const convertToArray = new Array(allPages).fill(0);

      let pages = convertToArray.map((page, index) => {
        const concat = index + 1;

        if (concat === 1 || concat === convertToArray.length) {
          return concat;
        }

        if (
          this.currentPage - this.position > concat ||
          this.currentPage + this.position < concat
        ) {
          return "...";
        }

        return concat;
      });

      return pages
        .join()
        .replace(/\.[.,]+(?!\.)/g, "...,")
        .split(",");
    }
  },
  watch: {
    getPagination() {
      const { allPages, currentPage } = this.getPagination;

      this.allPages = allPages;
      this.currentPage = +currentPage;
      this.pages = this.buildPages(allPages);
    }
  }
};
</script>
