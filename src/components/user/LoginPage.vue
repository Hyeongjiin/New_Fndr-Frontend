<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login" novalidate>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    v-model="user.email"
                    :class="{ 'is-invalid': message.emailError }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">{{ message.emailError }}</div>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    v-model="user.password"
                    :class="{
                        'is-invalid': message.passwordError,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">{{ message.passwordError }}</div>
            </div>
            <button type="submit">로그인</button>
            <router-link to="/signup"
                ><button>회원가입 하기</button></router-link
            >
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
                emailError: '',
                passwordError: '',
            },
            message: {
                emailError: '',
                passwordError: '',
            },
        };
    },
    methods: {
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.user.email)) {
                this.message.emailError = '유효한 이메일을 입력해주세요.';
            } else {
                this.message.emailError = '';
            }
        },
        validatePassword() {
            if (this.user.password.length == 0) {
                this.message.passwordError = '비밀번호를 입력해주세요.';
            } else {
                this.message.passwordError = '';
            }
        },
        login() {
            this.validateEmail();
            this.validatePassword();
            if (this.message.emailError || this.message.passwordError) {
                return;
            } else {
                this.$store.dispatch({
                    type: 'loginSubmit',
                    email: this.user.email,
                    password: this.user.password,
                });
            }
        },
    },
};
</script>
