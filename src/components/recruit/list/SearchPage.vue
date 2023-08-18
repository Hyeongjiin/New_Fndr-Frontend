<template>
    <div class="box">
        <search-side-bar :nationsList="organizedNationsList"></search-side-bar>
        <!-- 자식컴포넌트로 데이터 전달 -->
        <div class="right">
            <search-list :articles="results"></search-list>
            <PagingView :isLoading="isLoading" :has-more-pages="hasMorePages" :current-page="parseInt($route.params.page)"
                :total-pages="totalPages">
            </PagingView>
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
            isLoading: true, // 데이터 로딩 완료 판별데이터
            results: [],
            allResults: [], // 모든 페이지의 데이터를 저장하는 곳(5개 페이지)
            lastLoadedPage: 0, // 마지막으로 가져온 페이지를 추적
            hasMorePages: true,
            nationsList: [], // 국가리스트
            totalPages: 0,
        }
    },
    computed: {
        organizedNationsList() {
            const organizedData = {};

            for (const item of this.nationsList) {
                if (!organizedData[item.continent]) {
                    organizedData[item.continent] = {
                        name: item.continent,
                        countries: []
                    };
                }
                organizedData[item.continent].countries.push({ name: item.nation, id: item.id });
            }
            return Object.values(organizedData);
        }
    },
    methods: {
        async fetchResults(searchParams) {
            this.isLoading = true; // 로딩 시작
            this.results = [];
            this.allResults = [];

            let currentPage = parseInt(this.$route.params.page);

            let queryString = `keyword=${searchParams.keyword}&nation=${searchParams.nation.join(',')}`;

            if (searchParams.visa) {
                queryString += '&visa=true';
            }

            if (searchParams.remote) {
                queryString += '&remote=true';
            }

            const url = `http://localhost:8080/rest/search/${currentPage}?${queryString}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            this.totalPages = data.Response.page.total;
            console.log("Total Pages:", this.totalPages);
            if (data.Response.recruit_post_list.length === 0) {
                this.hasMorePages = false;
            } else {
                this.allResults[currentPage - 1] = data.Response.recruit_post_list;
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
                keyword: this.$route.query.keyword || '',
                nation: Array.isArray(this.$route.query.nation) ? this.$route.query.nation : [this.$route.query.nation]
            };

            if (this.$route.query.visa) {
                searchParams.visa = this.$route.query.visa === 'true';
            }

            if (this.$route.query.remote) {
                searchParams.remote = this.$route.query.remote === 'true';
            }

            this.fetchResults(searchParams);
        },
        async fetchInitialData() { // 국가데이터 불러오는 fetch메서드
            const url = 'http://localhost:8080/rest/search/init';
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.ResultCode === "ERR_OK") {
                    this.nationsList = data.Response.nation_continent_list;
                } else {
                    console.error("Failed to fetch initial data: ", data.Message);
                }
            } catch (error) {
                console.error("Error fetching initial data: ", error);
            }
        }
    },
    mounted() {
        this.loadDataFromRoute();
        this.fetchInitialData();
    },
    watch: {
        '$route.params.page': 'loadDataFromRoute',
        '$route.query.keyword': 'loadDataFromRoute',
        '$route.query.nation': 'loadDataFromRoute',
        '$route.query.visa': 'loadDataFromRoute',
        '$route.query.remote': 'loadDataFromRoute',
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