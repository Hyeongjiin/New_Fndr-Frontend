<template>
  <li class="main-recruit">
    <base-card v-for="(item, index) in articles" :key="index">
      <header>
        <h3>{{ item.description_title }}</h3>
      </header>
      <ul class="info">
        <li>회사이름 : {{ item.company_name }}</li>
        <li>remote : {{ item.is_remoted }}</li>
        <li>visa : {{ item.is_visa_sponsored }}</li>
        <li>게시일자 : {{ item.posted_date }}</li>
      </ul>
    </base-card>
  </li>
</template>

<script>
export default {
  data() {
    return {
      articles: null
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
  color:#4E4E4E;
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
  margin: 0.5rem 0;
}

p {
  margin: 0.5rem 0;
}

a {
  text-decoration: none;
  color: #ce5c00;
}

a:hover,
a:active {
  color: #c89300;
}
</style>
