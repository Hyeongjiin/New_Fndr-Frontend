<template>
    <search-section></search-section>
    <Main-card-list></Main-card-list>
</template>


<script>
import MainCardList from "../list-resources/MainCardList.vue";
import SearchSection from "../mainpage/SearchSection.vue";

export default {
    components: {
        MainCardList,
        SearchSection,
    }
}

</script>