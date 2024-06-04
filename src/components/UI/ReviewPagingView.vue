<template>
  <nav aria-label="Page navigation example" v-if="!isLoading">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" href="#" @click.prevent="previous">Previous</a>
      </li>
      <li class="page-item" v-for="page in pageNumbers" :key="page">
        <a
          class="page-link"
          :href="pageHref(page)"
          @click.prevent="$router.push(pageHref(page))"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          @click.prevent="next"
          :disabled="disableNext"
          v-if="!disableNext"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: parseInt(this.$route.params.page) || 1,
      pagesToShow: 5,
    };
  },
  computed: {
    ...mapState(["totalPages", "reviews"]),

    disableNext() {
      let disable = this.currentPage >= this.totalPages;
      return disable;
    },

    pageNumbers() {
      let startPage =
        Math.floor((this.currentPage - 1) / this.pagesToShow) *
          this.pagesToShow +
        1;
      let endPage = Math.min(startPage + this.pagesToShow - 1, this.totalPages);

      let pageArray = [];
      for (let i = startPage; i <= endPage; i++) {
        pageArray.push(i);
      }

      console.log("Page Numbers:", pageArray);
      return pageArray;
    },
    pageHref() {
      return (pageNum) => {
        return {
          name: "reivew",
          params: { page: pageNum },
          query: this.$route.query,
        };
      };
    },
  },
  methods: {
    ...mapActions(["fetchReviews"]),

    next() {
      if (!this.disableNext) {
        this.$router.push({
          name: "review",
          params: { page: parseInt(this.$route.params.page) + 1 },
          query: this.$route.query,
        });
        this.fetchReviews(parseInt(this.$route.params.page) + 1);
      }
    },
    previous() {
      if (this.$route.params.page > 1) {
        this.$router.push({
          name: "review",
          params: { page: parseInt(this.$route.params.page) - 1 },
          query: this.$route.query,
        });
        this.fetchReviews(parseInt(this.$route.params.page) - 1);
      }
    },
  },
  watch: {
    "$route.params.page": function (newPage) {
      this.currentPage = parseInt(newPage);
      this.fetchReviews(newPage);
    },
  },
  mounted() {
    // console.log("Current totalPages from store:", this.totalPages);
    this.fetchReviews(this.currentPage);
  },
};
</script>
<style scoped>
.page-item:first-child .page-link,
.page-item:last-child .page-link {
  /* color: #f73859; */
  color: #4e4e4e;
  background-color: #f8f8f8;
}
.page-item:first-child .page-link:hover {
  color: #f73859;
}
.page-item:last-child .page-link:hover {
  color: #f73859;
}
</style>
