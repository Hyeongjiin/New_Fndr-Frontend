<template>
  <li class="main-recruit">
    <base-card v-for="(item, index) in articles" :key="index">
      <h3>{{ item.description_title }}</h3>
      <ul class="info">
        <li><i class="bi bi-building-fill"></i> {{ item.company_name }}</li>
        <li><i class="bi bi-geo-alt-fill"></i> {{ item.location }}</li>
        <!-- <li>remote : {{ item.is_remoted }}</li>
        <li>visa : {{ item.is_visa_sponsored }}</li>
        <li>게시일자 : {{ item.posted_date }}</li> -->
      </ul>
    </base-card>
  </li>
  <div class="view-more">view more</div>
</template>

<script>
export default {
  data() {
    return {
      articles: null,
    }
  },

  beforeCreate() {

    fetch('http://localhost:8080/rest/main', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(response => response.json())
      .then(data => console.log(this.articles = data[0].Response));
  },
}
</script>

<style scoped>
.info {
  padding-left: 0rem;
  padding-top: 10px;
}

.info>li {
  float: left;
  margin-left: 10px;
}

.info>li:first-child {
  float: left;
  margin-left: 0px;
}


li {
  color: #4E4E4E;
  margin: auto;
  max-width: 40rem;
  list-style: none;
  margin-bottom: 0px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  margin: 0rem 0;
}

p {
  margin: 0rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

.bi {
  color: #F73859;
}

a:hover,
a:active {
  color: #c89300;
}

.view-more {
  display: flex;
  background-color: #F73859;
  color: #fff;
  margin: 0 auto;
  font-weight: bold;
  max-width: 20rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  margin-top:50px;
  margin-bottom:100px;
  border-radius: 0.5rem;
}
</style>
