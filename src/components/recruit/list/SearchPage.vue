<template>
    <div class="box">
        <search-side-bar></search-side-bar>
        <search-list></search-list>
    </div>
</template>

<style scoped>
.box {
    display: flex;
    width: 70rem;
    padding-top: 5rem;
    max-width: 70rem;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: center;

}
</style>


<script>
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";


export default {
    components: {
        SearchSideBar,
        SearchList,
    },
}

</script>