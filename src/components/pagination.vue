<template>
  <div id="pagination" class="container">
    <hr />
    <div class="btn-toolbar">
      <div class="btn-group">
        <button
          class="btn btn-primary"
          v-for="p in pages"
          @click.prevent="getPage(p)"
          :key="p"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pd: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    perPage: 5,
    currentIndex: 1,
  }),
  computed: {
    pages() {
      const pages = [];
      this.pd.forEach((p, i) => {
        if (!(i % this.perPage)) {
          pages.push(1 + i / this.perPage);
        }
      });
       return pages;
    },
  },
  methods: {
    getPage(currentIndex) {
      this.currentIndex = currentIndex;
      const startIndex = (currentIndex - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      const currentPage = this.pd.slice(startIndex, endIndex);
      this.$emit("sendPage", currentPage);
    },
  },
  watch: {
    pd() {
      this.getPage(this.currentIndex);
    },
  },
  mounted() {
    this.getPage(this.currentIndex);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>