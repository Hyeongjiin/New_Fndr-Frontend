<template>
    <div class="box" v-if="reviewData">
        <div class="card">
            <h1 class="title">{{ reviewData.title }}</h1>
            <ul>
                <!-- 날짜 형식 변환함수 사용-->
                <li><i class="bi bi-clock-fill"></i> {{ formattedDate }}</li>
                <div class="modAndDel" v-if="reviewData.creator_id === this.$store.state.userId">
                    <li @click="deleteReview"><i class="bi bi-trash-fill"></i>삭제</li>
                    <li><i class="bi bi-pencil-square"></i>수정</li>
                </div>
            </ul>
            <hr>
            <section>
                <div class="info" v-html="reviewData.content"></div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reviewData: null
        };
    },
    methods: {
        async getReviewDetail() {
            await this.$store.dispatch("fetchReviews", this.postId);
            this.reviewData = this.$store.state.reviews.find(review => Number(review.id) === Number(this.postId));
        },
        async deleteReview() {
            // 유저가 게시글을 삭제할때 확인
            if (confirm('Are you sure you want to delete this review?')) {
                // 게시글 삭제
                await this.$store.dispatch('deleteReview', this.postId);
                // redirect to another page or give a success message
                this.$router.push('/');
            }
        }
    },

    computed: {
        formattedDate() {
            const date = new Date(this.reviewData.created_at);
            const year = date.getFullYear();
            const month = (1 + date.getMonth()).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return year + '-' + month + '-' + day;
        },
        postId() {
            return this.$route.params.postId;
        },
    },
    mounted() {
        // console.log(this.postId);
        // postid 파라미터가 제대로 들어오는지 확인 ( ok )
        this.getReviewDetail();
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
