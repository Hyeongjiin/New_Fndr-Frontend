import { createApp } from "vue";
import { createStore } from "vuex";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap";
import { quillEditor } from "vue3-quill";

import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";

// 생성한 뷰 라우터 받아오기
import { router } from "./router/index.js";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      userId: null,
      jobDetail: {},
      jobDetailError: "",
      // review 기능
      reviews: [],
    };
  },
  mutations: {
    getDetail(state, detail) {
      state.jobDetail = detail;
    },
    getDetailError(state, detailError) {
      state.jobDetailError = detailError;
    },
    updateCompanyLogo(state, newLogo) {
      state.jobDetail.company_logo = newLogo;
    },
    login(state) {
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
    },
    getUserId(state, userId) {
      state.userId = userId;
      console.log(state.userId);
    },
    logout(state) {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn);
    },
    // review 기능
    setReviews(state, reviews) {
      state.reviews = reviews;
    },
  },
  getters: {
    tagsArray: (state) => {
      try {
        if (!state.jobDetail.tag) {
          return [];
        }
        const tagArray = JSON.parse(state.jobDetail.tag);
        const techNameArray = state.jobDetail.description_teches.map(
          (tech) => tech.tech_name
        );
        const totalTagArray = [...tagArray, ...techNameArray];
        return totalTagArray;
      } catch (error) {
        console.error("Failed to parse jobDetail.tag", error);
        return [];
      }
    },
  },
  actions: {
    // 채용공고의 detail을 가져올때
    async getPostDetail(context, postId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/rest/detail/${postId}`
        );
        console.log(response.data);
        if (response.data && response.data.Response) {
          context.commit("getDetail", response.data.Response);
        } else {
          context.commit("getDetailError", "Invalid response format.");
        }
        // console.log(context.state.jobDetail);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.Message
        ) {
          context.commit("getDetailError", error.response.data.Message);
        } else {
          context.commit(
            "getDetailError",
            "An error occurred while fetching job details."
          );
        }
      }
    },
    async deleteJobPost(context, postId) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/rest/job/${postId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data && response.data.Response) {
          context.commit("getDetail", response.data.Response);
          router.push("/");
        } else {
          context.commit("getDetailError", "Invalid response format.");
        }
      } catch (error) {
        console.log(error.request.response);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
      }
    },
    async signupSubmit(context, payload) {
      try {
        const response = await axios.post(
          "http://localhost:8080/rest/auth/signup",
          {
            email: payload.email,
            name: payload.name,
            password: payload.password,
          }
        );
        console.log(response);
        if (response.data.ResultCode === "Signup_Success") {
          console.log("회원가입에 성공했습니다.");
          router.push("/");
        } else {
          this.error = response.data.Message;
          console.log("에러가 발생했습니다.");
          console.log(this.error);
        }
      } catch (error) {
        console.log(error.request.response);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
      }
    },
    async loginSubmit(context, payload) {
      try {
        const response = await axios.post(
          "http://localhost:8080/rest/auth/login",
          {
            email: payload.email,
            password: payload.password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.data.ResultCode === "Login_Success") {
          console.log("로그인에 성공했습니다.");
          context.commit("login");
          router.push("/");
        } else {
          const errorMessage = response.data.Message;
          console.log("에러가 발생했습니다.");
          console.log(errorMessage);
        }
      } catch (error) {
        console.log(error.request.response);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
      }
    },
    async logoutSubmit(context) {
      try {
        const response = await axios.post(
          "http://localhost:8080/rest/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.data.ResultCode === "Logout_Success") {
          console.log("로그아웃에 성공했습니다.");
          context.commit("logout");
          router.push("/");
        } else {
          const errorMessage = response.data.Message;
          console.log("에러가 발생했습니다.");
          console.log(errorMessage);
        }
      } catch (error) {
        console.log(error.request.response);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
      }
    },
    async checkLoginStatus(context) {
      try {
        const response = await axios.get(
          "http://localhost:8080/rest/auth/session",
          {
            withCredentials: true,
          }
        );
        const userId = response.data.user_id;
        if (response.data.ResultCode === "Session_Exist") {
          console.log("세션이 존재합니다.");
          context.commit("getUserId", userId);
          context.commit("login");
        } else if (response.data.ResultCode === "Session_Not_Exist") {
          console.log("세션이 존재하지 않습니다.");
          context.commit("logout");
        }
      } catch (error) {
        console.log(error.response.data);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
      }
    },
    // review의 데이터 가져오기
    async fetchReviews({ commit }) {
      const url = `http://localhost:8080/rest/review/1`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.ResultCode === "ERR_OK") {
          const results = [
            ...data.Response.user_data.map((item) => ({
              ...item,
              type: "user",
            })),
            ...data.Response.crawling_data.map((item) => ({
              ...item,
              type: "crawling",
            })),
          ];
          commit("setReviews", results);
        } else {
          console.error("Failed to fetch data: ", data.Message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async deleteReview({ commit }, postId) {
      try {
        await axios.delete(`http://localhost:8080/rest/review/${postId}`,
        {
          withCredentials: true,
        });
        commit("DELETE_REVIEW", postId);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
const app = createApp(App);
app.component("base-card", BaseCard);
app.use(router);
app.use(store);
app.use(quillEditor);
app.mount("#app");
