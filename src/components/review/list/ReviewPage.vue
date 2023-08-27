<template>
    <div class="box">
        <div class="right">
            <review-list :articles="articles"></review-list>
        </div>
    </div>
</template>

<script>
import ReviewList from "../list/ReviewList.vue";
export default {
    components: {
        ReviewList,
    },
    data() {
        return {
            articles: [],
        }
    },
    computed: {
    },
    methods: {
    },
    created() {
        const pageNumber = this.$route.params.page || 1;
        this.$store.dispatch('fetchReviews');
    },
    watch: {
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