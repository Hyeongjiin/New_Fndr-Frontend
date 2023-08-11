<template>
    <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="join">
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
            <button type="submit">Sign Up</button>
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
        async join() {
            await this.$store.dispatch({
                type: 'joinSubmit',
                email: this.email,
                name: this.nickname,
                password: this.password,
            });
            this.$store.dispatch({
                type: 'loginSubmit',
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>
