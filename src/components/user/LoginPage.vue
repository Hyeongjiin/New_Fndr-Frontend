<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login" novalidate>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    v-model="email"
                    :class="{ 'is-invalid': emailError }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">{{ emailError }}</div>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    v-model="password"
                    :class="{
                        'is-invalid': passwordError,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">{{ passwordError }}</div>
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
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        };
    },
    methods: {
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.email)) {
                this.emailError = '유효한 이메일을 입력해주세요.';
            } else {
                this.emailError = '';
            }
        },
        validatePassword() {
            if (this.password.length == 0) {
                this.passwordError = '비밀번호를 입력해주세요.';
            } else {
                this.passwordError = '';
            }
        },
        login() {
            this.validateEmail();
            this.validatePassword();
            if (
                this.emailError ||
                this.passwordError ||
                this.passwordCheckError ||
                this.nicknameError
            ) {
                return;
            } else {
                this.$store.dispatch({
                    type: 'loginSubmit',
                    email: this.email,
                    password: this.password,
                });
            }
        },
    },
};
</script>
