<template>
  <div class="box">
    <SideBar></SideBar>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/mypage/SideBar.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    refreshIfSameRoute(event) {
      if (this.$route.path === event.currentTarget.getAttribute("href")) {
        location.reload();
      }
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style scoped>
.box {
  display: flex;
  width: 70rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  max-width: 70rem;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
}
</style>
