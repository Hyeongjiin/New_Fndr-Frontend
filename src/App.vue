<template>
    <the-header></the-header>
    <router-view></router-view>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';

export default {
    components: {
        TheHeader,
    },
    mounted() {
        this.$store.dispatch('checkLoginStatus');
    },
};
</script>

<style>
/* @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css); */
@import url('https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap');
@font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
        format('woff');
    font-weight: 400;
    font-style: normal;
}

* {
    font-size: 18px;
    font-family: 'Pretendard', 'sans-serif';
}

p {
    margin: 0;
}

body {
    margin: 0;
}
</style>
