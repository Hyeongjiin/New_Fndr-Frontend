import { createRouter, createWebHistory } from "vue-router";

// 만들어둔 컴포넌트 임포트 시키기
import MainPage from "../components/mainpage/MainPage.vue";
// import RecruitList from '../views/SecondView';

// 라우터 설계
const routes = [
  { path: "/", component: MainPage },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 추출 (main.js에서 import)
export { router };
