<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signupSubmit">
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
      <button type="submit" >Sign Up</button>
      <router-link to="/login"><button>Login</button></router-link>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordCheck: ''
    };
  },
  methods: {
    signupSubmit() {
      // 회원가입 로직 처리 (예: API 호출)
      console.log("Logging in with:", this.email, this.password);
    }
  }
};
</script>