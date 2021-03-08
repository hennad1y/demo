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
      value
        ? this.$router.push({ query: { page: 1, search: value } })
        : this.$router.push({ query: { page: undefined, search: undefined } });
    }
  }
};
</script>
