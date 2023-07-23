<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";


export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
@import url("https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap");

* {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}

body {
  margin: 0;
}
</style>