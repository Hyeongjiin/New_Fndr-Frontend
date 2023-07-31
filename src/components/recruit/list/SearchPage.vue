<template>
    <div class="box">
    <search-side-bar></search-side-bar>
    <search-list></search-list>
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
import SearchSideBar from "../list/SearchSideBar.vue";
import SearchList from "../list/SearchList.vue";


export default {
    components: {
        SearchSideBar,
        SearchList,
    }
}

</script>

