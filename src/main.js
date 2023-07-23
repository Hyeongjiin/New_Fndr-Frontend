import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap";

import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";

// 생성한 뷰 라우터 받아오기
import { router } from './router/index.js';

const app = createApp(App);
app.component("base-card", BaseCard);
app.use(router);
app.mount("#app");
