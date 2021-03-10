<template>
  <div class="form-group">
    <label for="search">Search</label>
    <input
      type="text"
      class="form-control"
      id="search"
      :value="search"
      @input="changeSearch"
    />
  </div>
</template>

<script>
export default {
  name: "TodoSearch",
  data() {
    return {
      search: ""
    };
  },
  created() {
    const { query } = this.$route;

    if (query?.search) {
      this.search = query.search;
    }
  },
  methods: {
    changeSearch({ target: { value } }) {
      const { query } = this.$route;

      value
        ? this.$router.push({ query: { ...query, page: 1, search: value } })
        : this.$router.push({
            query: { ...query, page: undefined, search: undefined }
          });
    }
  }
};
</script>
