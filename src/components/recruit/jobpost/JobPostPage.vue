<template>
  <div class="box">
    <div>
      <h2>Post a Job</h2>
      <form class="form" @submit.prevent="submitPostForm" novalidate>
        <div class="row">
          <div class="col-sm-6">
            <label class="label-title required">Company Name</label>
            <input
              type="company_name"
              v-model="post.company_name"
              placeholder="The fndr Corporation"
              :class="{
                'is-invalid': message.company_name_error,
              }"
              class="form-control"
              required
            />
            <div class="invalid-feedback">Please enter the company name.</div>
          </div>
          <div class="col-sm-6"></div>
        </div>
        <div>
          <label class="label-title">Company HomePage Link</label>
          <input
            type="company_page_link"
            v-model="post.company_page_link"
            placeholder="https://fndr.com"
            class="form-control"
          />
        </div>
        <div>
          <label class="label-title required">Job Title</label>
          <input
            type="description_title"
            v-model="post.description_title"
            placeholder="fndr developer"
            :class="{
              'is-invalid': message.description_title_error,
            }"
            class="form-control"
            required
          />
          <div class="invalid-feedback">Please enter the job title.</div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <label class="label-title required">Country</label>
            <select
              v-model="post.nation_id"
              :class="{
                'is-invalid': message.nation_id_error,
              }"
              class="form-control"
              required
            >
              <option value="" disabled>Select a country</option>
              <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
              >
                {{ country.name }}
              </option>
            </select>
            <div class="location-info">The Country of the job posting</div>
            <div class="invalid-feedback">Please select a country.</div>
          </div>
          <div class="col-sm-5">
            <label class="label-title required">Location</label>
            <input
              type="location"
              v-model="post.location"
              placeholder="Example: Seoul / Remote / Anywhere"
              :class="{
                'is-invalid': message.location_error,
              }"
              class="form-control"
              required
            />
            <div class="location-info">
              The City, Address or Remote of the job posting
            </div>
            <div class="invalid-feedback">Please enter the job location.</div>
          </div>
        </div>
        <div>
          <label class="label-title required">Application URL</label>
          <input
            type="company_apply_link"
            v-model="post.company_apply_link"
            placeholder="https://fndr.com/apply/software-developer"
            :class="{
              'is-invalid': message.company_apply_link_error,
            }"
            class="form-control"
            required
          />
          <div class="invalid-feedback">
            Please enter the job application link.
          </div>
        </div>
        <div>
          <div
            class="remote"
            :class="{
              'is-invalid': message.is_remoted_error,
            }"
          >
            <label class="label-title required">Remote work</label>
            <div>
              <input
                type="radio"
                id="is_remoted_yes"
                value="true"
                v-model="post.is_remoted"
                required
              />
              <label for="is_remoted_yes">Possible</label>
            </div>
            <div>
              <input
                type="radio"
                id="is_remoted_no"
                value="false"
                v-model="post.is_remoted"
                :class="{
                  'is-invalid': message.is_remoted_error,
                }"
                required
              />
              <label for="is_remoted_no">Impossible</label>
            </div>
          </div>
          <div class="invalid-feedback">
            Please confirm if remote work is available.
          </div>
        </div>
        <div>
          <div
            class="visa"
            :class="{
              'is-invalid': message.is_visa_sponsored_error,
            }"
          >
            <label class="label-title required">Visa support</label>
            <div>
              <input
                type="radio"
                id="is_visa_sponsored_yes"
                value="true"
                v-model="post.is_visa_sponsored"
                required
              />
              <label for="is_visa_sponsored_yes">Possible</label>
            </div>
            <div>
              <input
                type="radio"
                id="is_visa_sponsored_no"
                value="false"
                v-model="post.is_visa_sponsored"
                :class="{
                  'is-invalid': message.is_visa_sponsored_error,
                }"
                required
              />
              <label for="is_visa_sponsored_no">Impossible</label>
            </div>
          </div>
          <div class="invalid-feedback">
            Please confirm if visa support is provided.
          </div>
        </div>
        <div>
          <label class="label-title">Skills / Tags</label>
          <input
            type="tag"
            v-model="tag_input"
            placeholder="Example: Backend, MySQL, Java (Separated by comma)"
            class="form-control"
          />
          <div class="tag-info">
            Example: Backend, MySQL, Java (Separated by comma)
          </div>
        </div>
        <div>
          <label class="label-title required">Job Description</label>
          <TextEditor
            v-model="post.description_content"
            :class="{
              'is-invalid': message.description_content_error,
            }"
            class="form-control text-editor"
            required
          />
          <div class="invalid-feedback">Please enter the job content.</div>
        </div>
        <div>
          <label class="label-title">Company Logo</label>
          <input
            class="logo-input"
            id="fileInput"
            type="file"
            ref="companyLogoInput"
            @change="previewImage"
          />
          <label class="custom-file-label" for="fileInput">Select Logo</label>
        </div>
        <div>
          <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
        </div>
        <div class="job-post-error" v-if="this.message.job_post_error !== ''">
          {{ this.message.job_post_error }}
        </div>
        <div class="btn-box">
          <button class="btn post" type="submit">Post</button>
          <button class="btn cancle" @click="cancle">Cancle</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TextEditor from "../../../components/editors/TextEditor.vue";

const apiUrl = `${process.env.VUE_APP_API_URL}`;
export default {
  components: {
    TextEditor,
  },
  data() {
    return {
      countries: [
        { id: 1, name: "United States" },
        { id: 2, name: "Canada" },
        { id: 3, name: "United Kingdom" },
        { id: 4, name: "Ireland" },
        { id: 5, name: "Germany" },
        { id: 6, name: "France" },
        { id: 7, name: "Netherlands" },
        { id: 8, name: "Australia" },
        { id: 9, name: "Singapore" },
        { id: 10, name: "Hong Kong" },
        { id: 11, name: "Japan" },
      ],
      tag_input: "",
      tag_list: [],
      post: {
        nation_id: null,
        company_name: "",
        description_title: "",
        description_content: "",
        company_apply_link: "",
        is_visa_sponsored: null,
        is_remoted: null,
        company_page_link: "",
        tag: "",
        location: "",
      },
      message: {
        nation_id_error: "",
        company_name_error: "",
        description_title_error: "",
        description_content_error: "",
        company_apply_link_error: "",
        is_visa_sponsored_error: "",
        is_remoted_error: "",
        location_error: "",
        job_post_error: "",
      },
      imagePreview: null,
    };
  },
  watch: {
    tag_input: function (newVal, oldVal) {
      this.tag_list = newVal.split(",").map((tag) => tag.trim());
      this.post.tag = this.tag_list.join(", ");
    },
  },
  methods: {
    cancle() {
      this.$router.push("/");
    },
    previewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(this.post.company_email)) {
        this.message.company_email_error = "Invalid email format";
      } else {
        this.message.company_email_error = "";
      }
    },
    validateRadio(fieldName) {
      if (this.post[fieldName] === null) {
        this.message[fieldName + "_error"] = "error";
      } else {
        this.message[fieldName + "_error"] = "";
      }
    },
    validateForm(fieldName) {
      if (this.post[fieldName].length === 0) {
        this.message[fieldName + "_error"] = fieldName + " is required";
      } else {
        this.message[fieldName + "_error"] = "";
      }
    },
    validateNationId() {
      if (this.post.nation_id === null) {
        this.message.nation_id_error = "Country information is required";
      } else {
        this.message.nation_id_error = "";
      }
    },
    async submitPostForm() {
      const datas = [
        "company_name",
        "description_title",
        "description_content",
        "company_apply_link",
        "location",
      ];
      this.validateEmail();
      this.validateRadio("is_remoted");
      this.validateRadio("is_visa_sponsored");
      this.validateNationId();
      console.log(this.message.nation_id);
      for (let data of datas) {
        this.validateForm(data);
      }
      if (
        this.message.nation_id_error ||
        this.message.company_name_error ||
        this.message.description_title_error ||
        this.message.description_content_error ||
        this.message.company_apply_link_error ||
        this.message.is_visa_sponsored_error ||
        this.message.is_remoted_error ||
        this.message.contract_form_error ||
        this.message.location_error
      ) {
        this.message.job_post_error =
          "Please satisfy all the conditions for creating the job post.";
        console.log(this.message.job_post_error);
        return;
      }
      const postData = new FormData();
      for (let key in this.post) {
        postData.append(key, this.post[key]);
      }
      console.log(postData);
      const companyLogoFile = this.$refs.companyLogoInput.files[0];
      postData.append("company_logo", companyLogoFile);

      try {
        const response = await axios.post(
          `${apiUrl}/job`,
          postData,
          {
            withCredentials: true,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.ResultCode === "JobPost_Create_Success") {
          const newCompanyLogo = response.data.companyLogo;
          this.$store.commit("updateCompanyLogo", newCompanyLogo);
          const postId = response.data.postId;
          this.$router.push(`/detail/${postId}`);
        } else {
          console.log(response.data.Message);
          this.$router.push("/");
        }
      } catch (error) {
        console.error("API 호출 중 에러 발생", error);
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  width: 70rem;
  padding-top: 5rem;
  max-width: 70rem;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
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
.btn {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 12px;
  color: white;
  border: none;
  text-align: center;
  cursor: pointer;
  margin: 10px;
  height: 50px;
  width: 230px;
  font-size: 18px;
  border-radius: 15px;
}
.post {
  background-color: #f73859;
}
.cancle {
  color: #4e4e4e;
  background-color: #f5f5f5;
}
button:hover {
  opacity: 0.7;
}
.contact-info {
  color: #707891;
  font-size: 15px;
}
.location-info {
  color: #707891;
  font-size: 15px;
}
.tag-info {
  color: #707891;
  font-size: 17px;
}
.text-editor {
  height: 350px;
}
.job-post-error {
  font-size: 15px;
  color: #dd3a49;
}
.logo-input {
  display: none;
}

.custom-file-label {
  padding: 10px 15px;
  background-color: #f5f5f5;
  color: #3d3d3d;
  border: none;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.label-title {
  font-size: 17px;
}
.contract-type {
  display: flex;
  justify-content: space-between;
}

.contract-type div {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.contract-type div input {
  margin-right: 10px;
}
.remote {
  display: flex;
}
.remote div {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
.remote div input {
  margin-right: 10px;
}
.visa {
  display: flex;
}
.visa div {
  display: flex;
  align-items: center;
  margin-left: 50px;
}
.visa div input {
  margin-right: 10px;
}
[type="radio"] {
  display: none;
}

[type="radio"] + label::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #555;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}

[type="radio"]:checked + label::before {
  background: #f73859;
}
.form div {
  margin-top: 10px;
}
.required::after {
  content: "*";
  color: red;
  margin-left: 5px;
}
</style>
