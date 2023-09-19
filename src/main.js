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
      reviews: [], // 리뷰 리스트
      reviewDetail: {}, // 리뷰 개별
      reviewDetailError: "",
      // review 페이지네이션
      currentReviewPage: 1,
      totalReviewPages: 1,
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
    setReviews(state, results) {
      state.reviews = results;
    },
    delete_review(state, postId) {
      state.reviews = state.reviews.filter((review) => review.id !== postId);
    },
    getReviewDetail(state, review) {
      state.reviewDetail = review;
    },
    getReviewDetailError(state, detailError) {
      state.reviewDetailError = detailError;
    },
    // review 페이지네이션
    SET_CURRENT_REVIEW_PAGE(state, page) {
      state.currentReviewPage = page;
    },
    SET_TOTAL_REVIEW_PAGES(state, totalPages) {
      state.totalReviewPages = totalPages;
    },
  },
  getters: {
    tagsArray: (state) => {
      try {
        if (!state.jobDetail.tag) {
          return [];
        }
        const techNameArray = state.jobDetail.description_teches.map(
          (tech) => tech.tech_name
        );
        const totalTagArray = [...techNameArray];
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
    async fetchReviews({ commit }, page) {
      // reviewList의 fetch
      const url = `http://localhost:8080/rest/review?page=${page}`;
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
          const totalPages = Math.ceil(response.data.Size / 10); // 페이지 번호 계산
          commit("SET_TOTAL_REVIEW_PAGES", totalPages);
          commit("SET_CURRENT_REVIEW_PAGE", page);
          commit("setReviews", results);
        } else {
          console.error("Failed to fetch data: ", data.Message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async getReviewPostDetail(context, postId) {
      //review개별 조회
      try {
        const response = await axios.get(
          `http://localhost:8080/rest/review/${postId}`
        );
        if (response.data && response.data[0] && response.data[0].Response) {
          context.commit("getReviewDetail", response.data[0].Response);
        } else {
          context.commit("getReviewDetailError", "Invalid response format.");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.Message
        ) {
          context.commit("getReviewDetailError", error.response.data.Message);
        } else {
          context.commit(
            "getReviewDetailError",
            "An error occurred while fetching review details."
          );
        }
      }
    },
    async deleteReview(context, postId) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/rest/review/${postId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data && response.data.Response) {
          context.commit("delete_review", postId);
          // 리뷰 목록 페이지로 리디렉션
        } else {
          context.commit("getReviewDetailError", "Invalid response format.");
        }
      } catch (error) {
        console.log(error.request.response);
        const errorMessage =
          error.response.data.Message || "Internal server error";
        console.error("There was an error:", errorMessage);
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
