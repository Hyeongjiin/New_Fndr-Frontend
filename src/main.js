import { createApp } from "vue";
import { createStore } from "vuex";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap";

import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";

// 생성한 뷰 라우터 받아오기
import { router } from './router/index.js';

const store = createStore({
    state() {
        return {
        };
    },
    mutations: {

    },
    actions: {
        async joinSubmit(contest, payload) {
            try {
                const response = await axios.post("http://localhost:8080/rest/auth/join", {
                    email: payload.email,
                    name: payload.name,
                    password: payload.password,
                });
                console.log(response);
                if (response.data.ResultCode === "Signup_Success") {
                    console.log("회원가입에 성공했습니다.");
                    router.push("/");
                } else {
                    this.error = response.data.Message;
                    console.log("에러가 발생했습니다.")
                    console.log(this.error);
                }
            } catch (error) {
                console.log(error.request.response);
                const errorMessage = error.response.data.Message || "Internal server error";
                console.error("There was an error:", errorMessage);
            }
        },
        async loginSubmit(context, payload) {
            try {
                const response = await axios.post("http://localhost:8080/rest/auth/login", {
                    email: payload.email,
                    password: payload.password
                }, {
                    withCredentials: true,
                });
                console.log(response);
                if (response.data.ResultCode === "Login_Success") {
                    console.log("로그인에 성공했습니다.")
                    router.push('/');
                } else {
                    const errorMessage = response.data.Message;
                    console.log("에러가 발생했습니다.")
                    console.log(errorMessage);
                }
            } catch (error) {
                console.log(error.request.response);
                const errorMessage = error.response.data.Message || "Internal server error";
                console.error("There was an error:", errorMessage);
            }
        },
    },
    getters: {
        finalCounter(state, getters) {

        },
    }
});
const app = createApp(App);
app.component("base-card", BaseCard);
app.use(router);
app.use(store);
app.mount("#app");
