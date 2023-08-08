<template>
    <search-section @articles-loaded="updateArticles"></search-section>
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

    mounted() {

        fetch('http://localhost:8080/rest/main', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(data => console.log(this.articles = [...data.Remote, ...data.Visa]))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },

    data() {
        return {
            articles: [],
        };
    },
    methods: {
        updateArticles(articles) {
            this.articles = articles
        },
    },
}

</script>