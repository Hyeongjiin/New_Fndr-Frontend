<template>
  <div class="postingBox">
    <h1>My Posting</h1>
    <li class="search-list" v-if="myPostingExists">
      <base-card v-for="(item, index) in myPosting" :key="index">
        <div class="Search-section1">
          <div class="info">
            <router-link :to="'/detail/' + item.id">
              <h3>{{ item.description_title }}</h3>
            </router-link>
            <ul>
              <li>
                <i class="bi bi-building-fill"></i>
                {{ item.company_name }}
              </li>
              <li v-if="item.location !== ''">
                <i class="bi bi-geo-alt-fill"></i>
                {{ item.location }}
              </li>
              <li v-if="item.is_remoted === true">
                <i class="bi bi-house-check"></i> Remote
              </li>
              <li v-if="item.is_visa_sponsored === true">
                <i class="bi bi-card-checklist"></i> visa support
              </li>
            </ul>
          </div>
          <div class="info-img">
            <img
              v-if="item.company_logo === null || item.company_logo === ''"
              :src="require('@/components/img/image.png')"
              alt="Company Logo"
              class="default"
            />
            <img
              v-else
              :src="item.company_logo"
              alt="Company Logo"
              class="custom"
            />
          </div>
        </div>
      </base-card>
    </li>
    <div class="no-data" v-else>The data does not exist !</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  computed: {
    ...mapState(["myPosting", "myPostingExists"]),
  },
  methods: {
    ...mapActions(["getMyPosting"]),
  },
  created() {
    this.getMyPosting();
  },
};
</script>
<style scoped>
* {
  font-size: 16px;
  color: #4e4e4e;
}

.postingBox {
  border-radius: 12px;
  padding: 0rem;
  /* border: #d9d9d9 1px solid; */
  /* margin: 0 auto; */
  margin-bottom: 20px;
  width: 35rem;
}

hr {
  margin: 40px 0;
}

h1 {
  font-size: 20px;
  /* text-transform: uppercase; */
  font-weight: 700;
  margin-bottom: 2rem;
}

.search-list {
  /* width: 50rem; */
  list-style-type: none;
  margin-bottom: 50px;
}

.Search-section1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 20px; */
}

.info-img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: block;
}
.info-img > img {
  vertical-align: middle;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.info {
  display: flex;
  max-width: 36rem;
  flex-direction: column;
  align-items: flex-start;
}

.info > ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.info > ul > li {
  float: left;
  margin-left: 10px;
}

.info > ul > li:first-child {
  margin-left: 0px;
}

.info > a {
  text-decoration: none;
  color: black;
}

.info > a > h3 {
  font-size: 25px;
  font-weight: 700;
}

.bi {
  color: #f73859;
}

.description {
  padding: 20px;
  width: auto;
  height: 3rem;
  border-radius: 10px;
  background: #e3e3e3;
  display: inline-block;
}
.no-data {
  padding-top: 5rem;
  text-align: center;
  font-size: 1.2rem;
  color: #adadad;
  font-weight: Bold;
}

.info-img > img.default {
  width: 100%;
  filter: invert(44%) sepia(61%) saturate(7445%) hue-rotate(333deg)
    brightness(120%) contrast(71%);
}
</style>
