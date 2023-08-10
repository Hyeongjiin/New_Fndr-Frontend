<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginSubmit">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" >Login</button>
      <router-link to="/signup"><button>SingUp</button></router-link>
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
      error: ''
    };
  },
  methods: {
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