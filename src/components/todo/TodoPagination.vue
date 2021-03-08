<template>
  <nav v-if="allPages.length > 1">
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
        v-for="page in allPages"
        :key="page"
        :class="dynamicClasses(page)"
        @click="setPage(page)"
      >
        <a class="page-link" href="#" @click.prevent="">
          {{ page }}
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
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TodoPagination",
  data() {
    return {
      pages: 1,
      allPages: [],
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
        disabled: this.currentPage === this.pages
      };
    }
  },
  methods: {
    dynamicClasses(page) {
      const build = {};

      if (page === "...") {
        build.disabled = true;
      }

      if (this.currentPage === +page) {
        build.active = true;
      }

      return build;
    },

    setPage(page) {
      if (1 > page || page > this.pages || page === "...") return;

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

      this.pages = allPages;
      this.currentPage = +currentPage;
      this.allPages = this.buildPages(allPages);
    }
  }
};
</script>
