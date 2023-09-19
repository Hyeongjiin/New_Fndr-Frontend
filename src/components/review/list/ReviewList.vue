<template>
    <h2>Review</h2>
    <div class="writeBtn">
        <button v-if="this.$store.state.isLoggedIn" @click="goToReviewPostPage">
            <i class="bi bi-pen"></i> 리뷰 작성하기
        </button>
    </div>
    <div class="search-list-wrapper">
        <ul class="search-list">
            <li v-for="(item, index) in reviews" :key="index">
                <base-card>
                    <div class="Search-section1">
                        <div class="info">
                            <!-- item.type이 'crawling'일 경우 link로 이동 -->
                            <a v-if="item.type === 'crawling' && item.link" :href="item.link" target="_blank">
                                <h3>{{ item.title }}</h3>
                            </a>
                            <!-- 'crawling'이 아닐 경우, ReviewDetail.vue로 이동 -->
                            <!-- <router-link v-else :to="'/review/detail/' + item.id"> -->
                            <h3 v-else @click="goToReviewDetail(item.id)">{{ item.title }}</h3>
                            <!-- </router-link> -->
                            <ul v-if="item.type !== 'crawling'">
                                <li v-html="item.content"></li>
                            </ul>
                        </div>
                        <div class="imgbox">
                            <img v-if="!item.thumbnail || item.thumbnail === 'undefined'"
                                :src="require('@/components/img/image.png')" alt="company picture" class="default" />
                            <img v-else :src="item.thumbnail" alt="company picture" class="info-img" />
                        </div>
                    </div>
                </base-card>
            </li>
        </ul>
    </div>
    <ReviewPagingView></ReviewPagingView>
</template>
<script>
import ReviewPagingView from "@/components/UI/ReviewPagingView.vue"
export default {
    components: {
        ReviewPagingView,
    },
    watch: {
        // '$route': 'fetchReviews'
        '$route.params.page': function (newPage) {
            this.$store.dispatch('fetchReviews', newPage);
        }
    },
    computed: {
        reviews() {
            // console.log('reviews 계산된 속성이 트리거됨', this.$store.state.reviews);
            return this.$store.state.reviews;
        },

    },
    mounted() {
        const page = this.$route.params.page;
        this.$store.dispatch('fetchReviews', page);
    },
    methods: {
        goToReviewPostPage() {
            this.$router.push('/review-post');
        },
        goToReviewDetail(postId) {
            this.$router.push({ name: 'ReviewDetail', params: { id: postId } });
        },
    },
}
</script>

<style scoped>
* {
    font-size: 16px;
}

h2 {
    font-size: 2rem;
    font-weight: 700;
}

.writeBtn {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
}

.writeBtn>button {
    border-radius: 15px;
    background-color: #F73859;
    border: none;
    color: #fff;
    padding: 15px;
}

.bi-pen::before {
    content: "\f4c8";
    color: #fff;
}

.search-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.search-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    grid-column-gap: 20px;
    /* 아이템들 사이의 간격 */
    list-style-type: none;
    padding: 0;
    /* 기본 ul 패딩 제거 */
}

.search-list>li {
    flex: 0 0 calc(50% - 10px);
    /* 2열 레이아웃 설정, 10px은 gap의 반 값으로 gap을 고려한 너비 설정 */
}



.Search-section1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
}

.imgbox {
    width: 80px;
    height: 80px;
}

.imgbox>img.default {
    width: 80px;
    height: 80px;
    filter: invert(44%) sepia(61%) saturate(7445%) hue-rotate(333deg) brightness(120%) contrast(71%);
}

.info-img {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: block;
    background-color: #f73859;
}

.info {
    display: flex;
    max-width: 36rem;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 30px;
}

.info>ul {
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
}

.info>ul>li {
    float: left;
    margin-left: 10px;
}

.info>ul>li:first-child {
    margin-left: 0px;
}

.info>a {
    text-decoration: none;
    color: black;
}

.info h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
}

.bi {
    color: #f73859;
}

.description {
    padding: 20px;
    width: auto;
    height: 3rem;
    border-radius: 10px;
    background: #e3e3e3;
    display: inline-block;
}
</style>
