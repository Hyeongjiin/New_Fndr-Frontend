<template>
    <div class="box">
    <detail-view-left :jobDetail="jobDetail"></detail-view-left>
    <detail-view-right></detail-view-right>
    </div>
</template>

<style scoped>
.box{
    display: flex;
    margin-top: 3%;
    justify-content: center;   
}
</style>

<script>
import axios from 'axios';
import DetailViewLeft from "./DetailViewLeft.vue";
import DetailViewRight from "./DetailViewRight.vue";

export default {
    components: {
        DetailViewLeft,
        DetailViewRight,
    },
    data() {
        return {
            jobDetail: {},
            error: null,
        };
    },
    created() {
        const postId = this.$route.params.postId;
        this.fetchJobDetail(postId);
    },
    methods: {
        async fetchJobDetail(postId) {
            try {
                const response = await axios.get(`http://localhost:8080/rest/detail/${postId}`);
                if (response.data && response.data.Response) {
                    this.jobDetail = response.data.Response;
                } else {
                    this.error = "Invalid response format.";
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.Message) {
                    this.error = error.response.data.Message;
                } else {
                    this.error = "An error occurred while fetching job details.";
                }
            }
        }
    },
}
</script>