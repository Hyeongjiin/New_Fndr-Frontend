<template>
    <!-- SearchSection.vue에서 emits 발생 알림 -->
    <search-section @perform-search="fetchResults"></search-section>
    <Main-card-list :articles="articles"></Main-card-list>
</template>

<script>
import MainCardList from "../mainpage/MainCardList.vue";
import SearchSection from "../mainpage/SearchSection.vue";

export default {
    components: {
        MainCardList,
        SearchSection,
    },

    created() {
        fetch('http://localhost:8080/rest/main', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                this.articles.Remote = data.Remote;
                this.articles.Visa = data.Visa;
                console.log(this.articles)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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
        updateArticles(articles) {
            this.articles = articles
        },
    },
}

</script>