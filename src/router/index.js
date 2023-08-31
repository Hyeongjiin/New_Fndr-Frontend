import { createRouter, createWebHistory } from "vue-router";

// 만들어둔 컴포넌트 임포트 시키기
import MainPage from "../components/mainpage/MainPage.vue";
import SearchPage from "../components/recruit/list/SearchPage.vue";
import DetailPage from "../components/recruit/detail/DetailPage.vue";
import JobPostPage from "../components/recruit/jobpost/JobPostPage.vue";
import JobUpdatePage from "../components/recruit/jobpost/JobUpdatePage.vue";
import LoginPage from "../components/user/LoginPage.vue";
import SignupPage from "../components/user/SignupPage.vue";
import ReviewPage from "@/components/review/list/ReviewPage.vue";
import ReviewDetail from "@/components/review/detail/ReviewDetail.vue"
import ReviewPostPage from "@/components/review/reviewpost/ReviewPostPage.vue";
import ReviewUpdatePage from "@/components/review/reviewpost/ReviewUpdatePage.vue";

// 라우터 설계
const routes = [
  // 메인페이지
  { path: "/", component: MainPage },
  // 서치페이지
  { path: "/search-jobs/:page", component: SearchPage, name: 'search-jobs' },
  { path: "/detail/:postId", component: DetailPage },
  // 공고작성 CRUD
  { path: "/job-post", component: JobPostPage },
  { path: "/job-update/:postId", component: JobUpdatePage },
  // 로그인/회원가입
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  // 리뷰페이지
  { path: "/review/list/:page", component: ReviewPage },
  { path: "/review/detail/:id", component: ReviewDetail, name: 'ReviewDetail', },
  { path: "/review-post", component: ReviewPostPage },
  { path: "/review-update/:postId", component: ReviewUpdatePage }

  
];


// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 추출 (main.js에서 import)
export { router };
