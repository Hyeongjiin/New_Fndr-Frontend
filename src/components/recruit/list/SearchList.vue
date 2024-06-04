<template>
  <li class="search-list">
    <base-card v-for="(item, index) in articles" :key="index">
      <div class="Search-section1">
        <div class="info">
          <router-link :to="'/detail/' + item.id"
            ><h3>{{ item.description_title }}</h3></router-link
          >
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
        <div v-if="item.company_logo !== null" class="info-img">
          <img :src="getCompanyLogoUrl(item.company_logo)" alt="Company Logo" />
        </div>
      </div>
    </base-card>
  </li>
</template>
<script>
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  props: ["articles"],
  methods: {
    getCompanyLogoUrl(companyLogoPath) {
      if (companyLogoPath) {
        return `${apiUrl}/${companyLogoPath.replace(/\\/g, "/")}`;
      }
      return require("@/components/img/image.png");
    },
  },
};
</script>

<style scoped>
* {
  font-size: 16px;
}

.search-list {
  width: 50rem;
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
  /* background-color: #f73859; */
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
  padding: 0;
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
</style>
