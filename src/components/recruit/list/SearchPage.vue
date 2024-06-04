<template>
  <div class="no-data" v-if="isLoading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="box" v-else>
    <search-side-bar :nationsList="organizedNationsList"></search-side-bar>
    <!-- 자식컴포넌트로 데이터 전달 -->
    <div class="right">
      <search-list :articles="results"></search-list>
      <PagingView
        :isLoading="isLoading"
        :has-more-pages="hasMorePages"
        :current-page="parseInt($route.params.page)"
        :total-pages="totalPages"
      >
      </PagingView>
    </div>
  </div>
</template>

<script>
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";
import PagingView from "@/components/UI/PagingView.vue";

const apiUrl = `${process.env.VUE_APP_API_URL}`;

export default {
  components: {
    SearchSideBar,
    SearchList,
    PagingView,
  },
  data() {
    return {
      isLoading: true, // 데이터 로딩 완료 판별데이터
      results: [],
      allResults: [], // 모든 페이지의 데이터를 저장하는 곳(5개 페이지)
      lastLoadedPage: 0, // 마지막으로 가져온 페이지를 추적
      hasMorePages: true,
      nationsList: [
        { id: 1, nation: "United States", continent: "North America" },
        { id: 2, nation: "Canada", continent: "North America" },
        { id: 3, nation: "United Kingdom", continent: "Europe" },
        { id: 4, nation: "Ireland", continent: "Europe" },
        { id: 5, nation: "Germany", continent: "Europe" },
        { id: 6, nation: "France", continent: "Europe" },
        { id: 7, nation: "Netherlands", continent: "Europe" },
        { id: 8, nation: "Australia", continent: "Oceania" },
        { id: 9, nation: "Singapore", continent: "Asia" },
        { id: 10, nation: "Hong Kong", continent: "Asia" },
        { id: 11, nation: "Japan", continent: "Asia" },
      ], // 국가리스트
      totalPages: 0,
    };
  },
  computed: {
    organizedNationsList() {
      const organizedData = {};

      for (const item of this.nationsList) {
        if (!organizedData[item.continent]) {
          organizedData[item.continent] = {
            name: item.continent,
            countries: [],
          };
        }
        organizedData[item.continent].countries.push({
          name: item.nation,
          id: item.id,
        });
      }
      return Object.values(organizedData);
    },
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
    updateResults() {
      const pageIndex = parseInt(this.$route.params.page) - 1;
      this.results = this.allResults[pageIndex] || [];
    },
    loadDataFromRoute() {
      let searchParams = {
        keyword: this.$route.query.keyword || "",
        nation: Array.isArray(this.$route.query.nation)
          ? this.$route.query.nation
          : [this.$route.query.nation],
      };

      if (this.$route.query.visa) {
        searchParams.visa = this.$route.query.visa === "true";
      }

      if (this.$route.query.remote) {
        searchParams.remote = this.$route.query.remote === "true";
      }

      this.fetchResults(searchParams);
    },
  },
  mounted() {
    this.loadDataFromRoute();
  },
  watch: {
    "$route.params.page": "loadDataFromRoute",
    "$route.query.keyword": "loadDataFromRoute",
    "$route.query.nation": "loadDataFromRoute",
    "$route.query.visa": "loadDataFromRoute",
    "$route.query.remote": "loadDataFromRoute",
  },
};
</script>

<style scoped>
.box {
  display: flex;
  width: 70rem;
  padding-top: 5rem;
  max-width: 70rem;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
}

.no-data {
  margin: 0 auto;
  padding: 10rem;
  margin-top: 5rem;
  text-align: center;
  font-size: 1.2rem;
  color: #adadad;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* loading css */
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #f73859;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f73859 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
