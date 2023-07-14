<template>
  <ul>
    <main-card-list v-for="res in resources"
      :id="res.id"
      :key="res.id"
      :title="res.title"
      :description="res.description"
      :link="res.link">
    </main-card-list>
  </ul>
</template>
  
  <script>
import MainCardList from "./MainCardList.vue";
export default {
  components: {
    MainCardList,
  },
};
</script>
  
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>