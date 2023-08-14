<template>
    <div class="card">
        <h1 class="title">{{ jobDetail.description_title }}</h1>
        <div class="stackbox">
            <div class="stack" v-for="tag in tagsArray" :key="tag">
                {{ tag }}
            </div>
        </div>
        <hr style="margin-top: 0" />
        <section>
            <div class="info" v-html="jobDetail.description_content"></div>
        </section>
    </div>
</template>

<script>
export default {
    computed: {
        jobDetail() {
            return this.$store.state.jobDetail;
        },
        tagsArray() {
            return this.$store.getters.tagsArray;
        },
        // tagsArray() {
        //     try {
        //         if (!this.jobDetail.tag) {
        //             return [];
        //         }
        //         const tagArray = JSON.parse(this.jobDetail.tag); // tag의 JSON 파싱
        //         const techNameArray = this.jobDetail.description_teches.map(
        //             (tech) => tech.tech_name
        //         ); // description_teches에서 tech_name만 추출
        //         const totalTagArray = [...tagArray, ...techNameArray];
        //         return totalTagArray; // 두 배열 합침
        //     } catch (error) {
        //         console.error('Failed to parse jobDetail.tag', error);
        //         return []; // 파싱에러 났을 때 빈 배열을 리턴함
        //     }
        // },
    },
};
</script>

<style scoped>
.card {
    width: 50rem;
    height: auto;
    margin-bottom: 0;
    padding: 20px;
    margin-right: 2rem;
    border-color: rgba(217, 217, 217, 1);
}

.info {
    padding: 30px;
    background-color: rgba(242, 246, 248, 1);
    border-radius: 30px;
    line-height: 200%;
}

.box {
    width: 70%;
    height: auto;
    margin-right: 3ch;
    background-color: rgba(242, 246, 248, 1);
    border-color: rgba(56, 66, 89, 1);
    border-radius: 30px;
    line-height: 200px;
}

.stackbox {
    margin-bottom: 15px;
}

.stack {
    display: inline-block;
    background-color: rgba(242, 246, 248, 1);
    border-radius: 20px;
    font-size: 15px;
    font-weight: 700;
    color: rgba(247, 56, 89, 1);
    margin-right: 5px;
    margin-top: 10px;
    padding: 4px 10px;
    text-transform: uppercase;
}

.title {
    color: rgba(56, 66, 89, 1);
    font-size: 2rem;
}
</style>
