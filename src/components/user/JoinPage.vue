<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="joinSubmit">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label>Password Check:</label>
        <input type="password" v-model="passwordCheck" required />
      </div>
      <div>
        <label>Nickname:</label>
        <input type="nickname" v-model="nickname" required />
      </div>
      <button type="submit" >Sign Up</button>
      <router-link to="/login"><button>Login</button></router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    };
  },
  methods: {
    async joinSubmit() {
      try {
            const response = await axios.post("http://localhost:8080/rest/auth/join", {
                email: this.email,
                name: this.nickname,
                password: this.password,
            });
            console.log(response);
            if (response.data.ResultCode === "Signup_Success") {
                console.log("회원가입에 성공했습니다.");
                await this.loginSubmit();
                this.$router.push("/");
            } else {
                this.error = response.data.Message;
                console.log("에러가 발생했습니다.")
                console.log(this.error);
            }
        } catch (error) {
            console.error("There was an error:", error.response);
            this.error = error.response.data.Message || "Internal server error";
        }
    },
    async loginSubmit() {
        try {
            const response = await axios.post("http://localhost:8080/rest/auth/login", {
                email: this.email,
                password: this.password
            }, {
                withCredentials: true,
            });

            if (response.data.ResultCode === "Login_Success") {
                console.log("로그인에 성공했습니다.")
                this.$router.push("/");
            } else {
                this.error = response.data.Message;
                console.log("에러가 발생했습니다.")
                console.log(this.error);
            }
        } catch (error) {
            console.error("There was an error:", error.response);
            this.error = error.response.data.Message || "Internal server error";
        }
    }
  }
};
</script>