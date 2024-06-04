<template>
  <div class="box">
    <detail-view-left></detail-view-left>
    <detail-view-right></detail-view-right>
  </div>
</template>

<script>
import DetailViewLeft from "./DetailViewLeft.vue";
import DetailViewRight from "./DetailViewRight.vue";

export default {
  components: {
    DetailViewLeft,
    DetailViewRight,
  },
  computed: {
    jobDetail() {
      return this.$store.state.jobDetail;
    },
    jobDetailError() {
      return this.$store.state.jobDetailError;
    },
  },
  mounted() {
    const postId = this.$route.params.postId;
    this.$store.dispatch("getPostDetail", postId);
  },
};
</script>

<style scoped>
.box {
  display: flex;
  padding-top: 5rem;
  padding-bottom: 5rem;
  max-width: 70rem;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
}
</style>
