<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
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
    login() {
      this.$store.dispatch({
        type: 'loginSubmit',
        email: this.email,
        password: this.password,
      })
    }
  }
};
</script>