<template>
  <div class="button-box">
    <!-- 버튼누르면 fetch 시작 -->
    <button id="button" @click="clickRemote">remote</button>
    <button id="button" @click="clickVisa">visa</button>
  </div>
  <li class="main-recruit">
    <!-- Remote Datas -->
    <base-card
      v-for="remote in articles.Remote.slice(0, remoteToShow)"
      :key="remote.id"
    >
      <router-link :to="'/detail/' + remote.id"
        ><h3>{{ remote.description_title }}</h3></router-link
      >
      <ul class="info">
        <li><i class="bi bi-building-fill"></i> {{ remote.company_name }}</li>
        <li v-if="remote.location !== ''">
          <i class="bi bi-geo-alt-fill"></i> {{ remote.location }}
        </li>
        <li v-if="remote.is_remoted === true">
          <i class="bi bi-house-check"></i> Remote
        </li>
        <li v-if="remote.is_visa_sponsored === true">
          <i class="bi bi-card-checklist"></i> Visa sponsored
        </li>
      </ul>
    </base-card>

    <!-- Visa Datas -->
    <base-card
      v-for="visa in articles.Visa.slice(0, visaToShow)"
      :key="visa.id"
    >
      <router-link :to="'/detail/' + visa.id"
        ><h3>{{ visa.description_title }}</h3></router-link
      >
      <ul class="info">
        <li><i class="bi bi-building-fill"></i> {{ visa.company_name }}</li>
        <li v-if="visa.location !== ''">
          <i class="bi bi-geo-alt-fill"></i> {{ visa.location }}
        </li>
        <li v-if="visa.is_remoted === true">
          <i class="bi bi-house-check"></i> Remote
        </li>
        <li v-if="visa.is_visa_sponsored === true">
          <i class="bi bi-card-checklist"></i> Visa sponsored
        </li>
      </ul>
    </base-card>
  </li>
  <router-link to="/search-jobs/1"
    ><div class="view-more">Go to Search jobs</div></router-link
  >
</template>

<script>
export default {
  props: ["articles"],
  data() {
    return {
      isRemoteClicked: false,
      isVisaClicked: false,
      remoteToShow: 3,
      visaToShow: 3,
    };
  },
  methods: {
    clickRemote() {
      this.isRemoteClicked = !this.isRemoteClicked;
      if (this.isVisaClicked === true) {
        this.isVisaClicked = !this.isVisaClicked;
      }
    },
    clickVisa() {
      this.isVisaClicked = !this.isVisaClicked;
      if (this.isRemoteClicked === true) {
        this.isRemoteClicked = !this.isRemoteClicked;
      }
    },
    showMain() {
      if (!this.isRemoteClicked && !this.isVisaClicked) {
        (this.remoteToShow = 3), (this.visaToShow = 3);
      } else if (this.isRemoteClicked && !this.isVisaClicked) {
        (this.remoteToShow = 6), (this.visaToShow = 0);
      } else if (!this.isRemoteClicked && this.isVisaClicked) {
        (this.remoteToShow = 0), (this.visaToShow = 6);
      }
    },
  },
  watch: {
    isRemoteClicked() {
      this.showMain();
    },
    isVisaClicked() {
      this.showMain();
    },
  },
};
</script>

<style scoped>
.info {
  padding-left: 0rem;
  padding-top: 1rem;
}

.info > li {
  float: left;
  margin-right: 10px;
  font-size: 16px;
}

.info > li:first-child {
  float: left;
  margin-left: 0px;
}

li {
  color: #4e4e4e;
  margin: auto;
  max-width: 45rem;
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
  font-weight: bold;
}

p {
  margin: 0rem 0;
}

a {
  text-decoration: none;
  color: black;
  transition: all ease 0.4s 0s;
}

.bi {
  color: #f73859;
}

a:hover,
a:active {
  color: #f73859;
  transition: all ease 0.4s 0s;
}

.view-more {
  display: flex;
  background-color: #f73859;
  color: #fff;
  margin: 0 auto;
  font-weight: bold;
  max-width: 20rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 100px;
  border-radius: 0.5rem;
}

.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
  width: 268px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

.button-box > button:first-child {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #f73859;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
  margin-right: 10px;
}

.button-box > button:last-child {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #f73859;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
  margin-left: 10px;
}

button {
  transition: all ease 0.4s 0s;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;
}

button:hover,
a:hover {
  opacity: 0.7;
  transition: all ease 0.4s 0s;
}
</style>
