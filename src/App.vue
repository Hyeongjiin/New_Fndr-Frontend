<template>
  <the-header></the-header>
  <search-section></search-section>
  <main-card-list></main-card-list>
  
</template>

<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import MainCardList from "./components/list-resources/MainCardList.vue";
import SearchSection from "./components/mainpage/SearchSection.vue";


export default {
  components: {
    TheHeader,
    MainCardList,
    SearchSection,
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