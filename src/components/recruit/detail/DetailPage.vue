<template>
    <div class="box">
    <detail-view-left></detail-view-left>
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
import DetailViewLeft from "./DetailViewLeft.vue";
import DetailViewRight from "./DetailViewRight.vue";

export default {

    components: {
        DetailViewLeft,
        DetailViewRight,
    }
    
}
</script>