<template>
  <!-- SearchSection.vue에서 emits 발생 알림 -->
  <search-section></search-section>
  <Main-card-list :articles="articles"></Main-card-list>
</template>

<script>
import MainCardList from "../mainpage/MainCardList.vue";
import SearchSection from "../mainpage/SearchSection.vue";

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  components: {
    MainCardList,
    SearchSection,
  },
  created() {
    fetch(`${apiUrl}/main`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.articles.Remote = data.Remote;
        this.articles.Visa = data.Visa;
        console.log(this.articles);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },

  data() {
    return {
      articles: {
        Remote: [],
        Visa: [],
      },
    };
  },
  methods: {
    async fetchResults(searchParams) {
      this.isLoading = true; // 로딩 시작
      this.results = [];
      this.allResults = [];

      let currentPage = parseInt(this.$route.params.page);

      let queryString = `keyword=${
        searchParams.keyword
      }&nation=${searchParams.nation.join(",")}`;

      if (searchParams.visa) {
        queryString += "&visa=true";
      }

      if (searchParams.remote) {
        queryString += "&remote=true";
      }

      const url = `${apiUrl}/search/${currentPage}?${queryString}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      this.totalPages = data.Response.page.total;
      console.log("Total Pages:", this.totalPages);
      if (data.Response.recruitPostList.length === 0) {
        this.hasMorePages = false;
      } else {
        this.allResults[currentPage - 1] = data.Response.recruitPostList;
        this.hasMorePages = true;
        this.lastLoadedPage = currentPage;
      }

      this.updateResults();
      this.isLoading = false; // 데이터 로딩처리 완료
    },
    updateArticles(articles) {
      this.articles = articles;
    },
  },
};
</script>
