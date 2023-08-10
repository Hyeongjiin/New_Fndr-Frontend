import { createRouter, createWebHistory } from "vue-router";

// 만들어둔 컴포넌트 임포트 시키기
import MainPage from "../components/mainpage/MainPage.vue";
import SearchPage from "../components/recruit/list/SearchPage.vue";
import DetailPage from "../components/recruit/detail/DetailPage.vue";
import LoginPage from "../components/user/LoginPage.vue";
import SignPage from "../components/user/SignPage.vue";

// 라우터 설계
const routes = [
  { path: "/", component: MainPage },
  { path: "/search-jobs", component: SearchPage },
  { path: "/detail/:postId", component: DetailPage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignPage },
  

];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 추출 (main.js에서 import)
export { router };
