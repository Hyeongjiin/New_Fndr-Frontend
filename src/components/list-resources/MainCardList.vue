<template>
  <li>
    <base-card>
      <header>
        <h3>"Marketing Manager (m/f/d)"</h3>
      </header>
      <ul class="info">
        <li><div>fraud0 GmbH</div></li>
        <li><div>Munich</div></li>
        <li><div>visa support</div></li>
      </ul>
    </base-card>
  </li>
</template>

<script>
export default {
  // props: ['id','title', 'description', 'link'],
  // inject: ['removeResource']
  methods: {
    // getData(){
    //   fetch(
    //     'http://localhost:3000',{
    //   headers : { 
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //    }
    //   }
    //   ).then(function(response){
    //       if(response.ok) {
    //         return response.json();
    //       }
    //     }
    //   ).then(function(data){
    //     console.log(data);
    //   });
    // }
  }
};
</script>

<style scoped>
.info {
  padding-left: 0rem;
}
.info > li {
  float: left;
  margin-left: 10px;
}

.info > li:first-child {
  float: left;
  margin-left: 0px;
}

li {
  margin: auto;
  max-width: 40rem;
  list-style: none;
  margin-bottom: 20px;
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
