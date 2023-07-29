<template>
    <div class="box">
    <search-side-bar></search-side-bar>
    <div class="box2">
    <search-list></search-list>
    <search-list></search-list>
    <search-list></search-list>
    <search-list></search-list>
    </div>
</div>
</template>

<style scoped>
.box{
    display: flex;
    margin-top: 3%;
}

</style>


<script>
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";


export default {
    components: {
        SearchSideBar,
        SearchList,
    }
}

</script>

