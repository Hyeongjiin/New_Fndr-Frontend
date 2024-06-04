import { createRouter, createWebHistory } from "vue-router";

// 만들어둔 컴포넌트 임포트 시키기
import MainPage from "../components/mainpage/MainPage.vue";
import SearchPage from "../components/recruit/list/SearchPage.vue";
import DetailPage from "../components/recruit/detail/DetailPage.vue";
import JobPostPage from "../components/recruit/jobpost/JobPostPage.vue";
import JobUpdatePage from "../components/recruit/jobpost/JobUpdatePage.vue";
import LoginPage from "../components/user/LoginPage.vue";
import SignupPage from "../components/user/SignupPage.vue";
import MyPage from "@/components/mypage/MyPage.vue";
import EditAccount from "@/components/mypage/EditAccount.vue";
import MyPosting from "@/components/mypage/MyPosting.vue";

// 라우터 설계
const routes = [
  // 메인페이지
  { path: "/", component: MainPage },
  // 서치페이지
  { path: "/search-jobs/:page", component: SearchPage, name: "search-jobs" },
  { path: "/detail/:postId", component: DetailPage },
  // 공고작성 CRUD
  { path: "/job-post", component: JobPostPage },
  { path: "/job-update/:postId", component: JobUpdatePage },
  // 로그인/회원가입
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  // 마이페이지
  {
    path: "/mypage",
    component: MyPage,
    children: [
      {
        path: "edit-info",
        component: EditAccount,
      },
      {
        path: "my-posting",
        component: MyPosting,
      },
    ],
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 추출 (main.js에서 import)
export { router };
