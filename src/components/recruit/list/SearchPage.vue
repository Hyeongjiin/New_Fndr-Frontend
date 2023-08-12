<template>
    <div class="box">
        <search-side-bar></search-side-bar>
        <!-- 자식컴포넌트로 데이터 전달 -->
        <search-list :articles="results"></search-list>
    </div>
</template>

<script>
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";
export default {
    components: {
        SearchSideBar,
        SearchList,
    },
    data() {
        return {
            results: [],
        }
    },
    methods: {
        // SearchSection.vue에서 보낸 emits 여기서 사용
        fetchResults(searchParams) {
            const currentPage = this.$route.params.page || 1;
            const url = `http://localhost:8080/rest/search/${currentPage}?keyword=${searchParams.keyword}&nation=${searchParams.nation}`;

            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.results = data.Response.recruit_post_list;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
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
        '$route.query': 'loadDataFromRoute'
        // $route.query값이 변화 되는 것이 감지 되면 바뀐 값을 렌더링하게 함
    },
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