<template>
  <div class="rightbox">
    <div class="imgbox">
      <img
        v-if="jobDetail.company_logo === null || jobDetail.company_logo === ''"
        :src="require('@/components/img/image.png')"
        alt="company picture"
        class="default"
      />
      <img
        v-else-if="jobDetail.company_logo"
        :src="jobDetail.company_logo"
        alt="company picture"
        class="custom"
      />
    </div>
    <h1 class="title">{{ jobDetail.company_name }}</h1>
    <ul class="info">
      <li v-if="jobDetail.location !== ''">
        <i class="bi bi-geo-alt-fill"></i> {{ jobDetail.location }}
      </li>
      <li v-if="jobDetail.is_visa_sponsored === true">
        <i class="bi bi-card-checklist"></i> Visa sponsored
      </li>
      <li v-if="jobDetail.is_remoted === true">
        <i class="bi bi-house-check"></i> Remote
      </li>
      <li v-if="jobDetail.company_page_link !== null">
        <i class="bi bi-link-45deg"></i>
        <a :href="jobDetail.company_page_link">website</a>
      </li>
    </ul>
    <div class="btn-box">
      <button
        v-if="jobDetail.company_apply_link !== null"
        class="contact-btn"
        @click="redirectToOtherSite"
      >
        Apply
      </button>
    </div>
    <div class="btn-box">
      <button
        v-if="
          this.$store.state.isLoggedIn === true &&
          jobDetail.creator_id === this.$store.state.userId
        "
        class="modify-btn"
        @click="editJobPost"
      >
        Edit
      </button>
      <button
        v-if="
          this.$store.state.isLoggedIn === true &&
          jobDetail.creator_id === this.$store.state.userId
        "
        class="modify-btn"
        @click="deleteJobPost"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
const apiUrl = `${process.env.VUE_APP_API_URL}`;

export default {
  computed: {
    jobDetail() {
      return this.$store.state.jobDetail;
    },
  },
  methods: {
    redirectToOtherSite() {
      if (this.jobDetail.company_apply_link !== null) {
        window.open(this.jobDetail.company_apply_link, "_blank");
      }
    },
    editJobPost() {
      if (this.jobDetail.creator_id === this.$store.state.userId) {
        this.$router.push(`/job-update/${this.jobDetail.id}`);
      }
    },
    deleteJobPost() {
      if (this.jobDetail.creator_id === this.$store.state.userId) {
        this.$store.dispatch("deleteJobPost", this.jobDetail.id);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.rightbox {
  display: flex;
  border-color: rgba(217, 217, 217, 1);
  height: auto;
  width: 20rem;
  text-align: center;
  padding: 30px;
  border-radius: 15px;
  background-color: rgba(248, 248, 248, 1);
  flex-direction: column;
  align-items: center;
}

.imgbox {
  width: 100px;
}

.imgbox > img.default {
  width: 100%;
  filter: invert(44%) sepia(61%) saturate(7445%) hue-rotate(333deg)
    brightness(120%) contrast(71%);
}

.imgbox > img.custom {
  width: 100%;
  border-radius: 2rem;
}

.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
  width: 268px;
  margin: 0 auto;
  margin-top: 26px;
}

.title {
  color: rgba(56, 66, 89, 1);
  font-size: 32px;
  margin-top: 20px;
}

.info {
  list-style-type: none;
  margin-top: 0;
  padding-left: 0;
  margin-bottom: 0rem;
}

.info > li {
  margin-top: 10px;
}

.bi {
  color: #f73859;
}

.contact-btn {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 12px;
  color: white;
  background-color: #f73859;
  border: none;
  text-align: center;
  cursor: pointer;
  height: 50px;
  width: 230px;
  font-size: 18px;
  border-radius: 50px;
}

.modify-btn {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 12px;
  color: white;
  background-color: #adadad;
  border: none;
  text-align: center;
  cursor: pointer;
  height: 45px;
  width: 100px;
  margin: 10px;
  font-size: 15px;
  border-radius: 50px;
}

button:hover,
a:hover {
  opacity: 0.7;
}
</style>
