<template>
    <div class="box">
        <search-side-bar></search-side-bar>
        <!-- 자식컴포넌트로 데이터 전달 -->
        <div class="right">
            <search-list :articles="results"></search-list>
            <PagingView :has-more-pages="hasMorePages" :current-page="parseInt($route.params.page)"></PagingView>
        </div>
    </div>
</template>

<script>
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";
import PagingView from "@/components/UI/PagingView.vue"
export default {
    components: {
        SearchSideBar,
        SearchList,
        PagingView,
    },
    data() {
        return {
            results: [],
            allResults: [], // 모든 페이지의 데이터를 저장하는 곳(5개 페이지)
            lastLoadedPage: 0, // 마지막으로 가져온 페이지를 추적
            hasMorePages: true // Initialize to true, assuming there might be more pages at the beginning
        }
    },
    methods: {
        async fetchResults(searchParams) {
            let currentPage = parseInt(this.$route.params.page);

            const url = `http://localhost:8080/rest/search/${currentPage}?keyword=${searchParams.keyword}&nation=${searchParams.nation}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();

            if (data.Response.recruit_post_list.length === 0) {
                this.hasMorePages = false;
            } else {
                this.allResults[currentPage - 1] = data.Response.recruit_post_list;  // Store data at page index
                this.hasMorePages = true;  // Since we got data for the current page, assume there might be a next page
                this.lastLoadedPage = currentPage;
            }

            this.updateResults();
        },
        updateResults() {
            const pageIndex = parseInt(this.$route.params.page) - 1;
            this.results = this.allResults[pageIndex] || [];
        },
        loadDataFromRoute() {
            let searchParams = {
                keyword: this.$route.query.keyword || '',
                nation: this.$route.query.nation || ''
            };
            this.fetchResults(searchParams);
        }
    },
    mounted() {
        this.loadDataFromRoute();
    },
    watch: {
        '$route.params.page': function (newPage) {
            this.updateResults();

            if (!this.results.length) {
                this.fetchResults({
                    keyword: this.$route.query.keyword || '',
                    nation: this.$route.query.nation || ''
                });
            }
        }
    }
}
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
</style>