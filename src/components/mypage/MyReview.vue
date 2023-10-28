<template>
    <div class="postingBox">
        <h1>
            My Review
        </h1>
        <ul class="search-list" v-if="myReviewExists">
            <li v-for="(item, index) in myReview" :key="index">
                <base-card>
                    <div class="Search-section1">
                        <div class="info">
                            <h3 @click="goToReviewDetail(item.id)">{{ item.title }}</h3>
                            <!-- </router-link> -->
                            <ul>
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
        <div class="no-data" v-else>The data does not exist !</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(['myReview', 'myReviewExists'])
    },
    methods: {
        ...mapActions(['getMyReview']),
        goToReviewDetail(postId) {
            this.$router.push({ name: 'ReviewDetail', params: { id: postId } });
        },
    },
    created() {
        this.getMyReview();
    }
}
</script>
<style scoped>
* {
    font-size: 16px;
    color: #4E4E4E;
}

.postingBox {
    border-radius: 12px;
    padding: 0rem;
    /* border: #d9d9d9 1px solid; */
    /* margin: 0 auto; */
    margin-bottom: 20px;
    width: 35rem;
}

hr {
    margin: 40px 0;
}

h1 {
    font-size: 20px;
    /* text-transform: uppercase; */
    font-weight: 700;
    margin-bottom: 2rem;
}


.search-list {
    width: 100%;
    padding: 0;
    /* 기본 ul 패딩 제거 */
}

.search-list>li {
    list-style-type: none;
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
    font-size: 26px;
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
.no-data {
    padding-top: 5rem;
    text-align: center;
    font-size: 1.2rem;
    color: #ADADAD;
    font-weight: Bold;
}</style>