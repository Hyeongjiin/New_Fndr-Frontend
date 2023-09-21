<template>
    <div class="box">
        <div class="card">
            <h1 class="title">{{ reviewDetail.title }}</h1>
            <ul>
                <li><i class="bi bi-clock-fill"></i> {{ formattedDate }}</li>
                <div class="modAndDel" v-if="this.$store.state.isLoggedIn === true && reviewDetail.creator_id === this.$store.state.userId">
                    <li @click="deleteReview"><i class="bi bi-trash-fill"></i>delete</li>
                    <li @click="editReview"><i class="bi bi-pencil-square"></i>edit</li>
                </div>
            </ul>
            <hr>
            <section>
                <div class="info" v-html="reviewDetail.content"></div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        async deleteReview() {
            if (confirm('Are you sure you want to delete this review?')) {
                this.$store.dispatch('deleteReview', this.reviewDetail.id);
                this.$store.dispatch('fetchReviews', 1);
                this.$router.push(`/review/1`); 
            }
        },
        async editReview() {
            if (confirm('Are you sure you want to edit this review?')) {
                this.$router.push(`/review-update/${this.reviewDetail.id}`);
            }
        }
    },

    computed: {
        formattedDate() {
            const date = new Date(this.reviewDetail.created_at);
            const year = date.getFullYear();
            const month = (1 + date.getMonth()).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return year + '-' + month + '-' + day;
        },
        reviewDetail() {
            return this.$store.state.reviewDetail;
        },
        reviewDetailError() {
            return this.$store.state.reviewDetailError;
        },
    },
    mounted() {
        const postId = this.$route.params.id;
        this.$store.dispatch('getReviewPostDetail', postId);
    }
}
</script>
<style scoped>
* {
    font-size: 16px;
}

.card {
    width: 50rem;
    height: auto;
    margin-bottom: 0;
    padding: 20px;
    /* border-color: rgba(217, 217, 217, 1); */
    border: 0;
}

.info {
    padding: 30px;
    background-color: rgba(242, 246, 248, 1);
    border-radius: 17px;
    line-height: 200%;
}

.title {
    color: black;
    font-size: 2rem;
    margin-bottom: 15px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

.bi {
    color: #f73859;
}

.box {
    display: flex;
    width: 70rem;
    padding-top: 5rem;
    max-width: 70rem;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: center;

}

.modAndDel {
    display: flex;
}

.modAndDel>li:last-child {
    margin-left: 10px;
}
</style>
