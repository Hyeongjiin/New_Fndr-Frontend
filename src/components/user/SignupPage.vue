<template>
    <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="signup">
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    v-model="email"
                    @input="validateEmail"
                    :class="{ 'is-invalid': emailError }"
                    class="form-control"
                />
                <div class="invalid-feedback">{{ emailError }}</div>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    v-model="password"
                    @input="validatePassword"
                    :class="{
                        'is-invalid': passwordError,
                        'is-valid': passwordValid,
                    }"
                    class="form-control"
                />
                <div class="valid-feedback">{{ passwordValid }}</div>
                <div class="invalid-feedback">{{ passwordError }}</div>
            </div>
            <div>
                <label>Password Check:</label>
                <input
                    type="password"
                    v-model="passwordCheck"
                    @input="validatePasswordCheck"
                    :class="{
                        'is-invalid': passwordCheckError,
                        'is-valid': passwordCheckValid,
                    }"
                    class="form-control"
                />
                <div class="valid-feedback">{{ passwordCheckValid }}</div>
                <div class="invalid-feedback">{{ passwordCheckError }}</div>
            </div>
            <div>
                <label>Nickname:</label>
                <input
                    type="nickname"
                    v-model="nickname"
                    @input="validateNickname"
                    :class="{ 'is-invalid': nicknameError }"
                    class="form-control"
                />
                <div class="invalid-feedback">{{ nicknameError }}</div>
            </div>
            <div v-if="this.signupError !== ''">{{ this.signupError }}</div>
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
            emailError: '',
            passwordValid: '',
            passwordError: '',
            passwordCheckValid: '',
            passwordCheckError: '',
            nicknameError: '',
            signupError: '',
        };
    },
    methods: {
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.email)) {
                this.emailError = '유효하지 않은 이메일 형식입니다.';
            } else {
                this.emailError = '';
            }
        },
        validatePassword() {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/;
            if (!passwordRegex.test(this.password)) {
                this.passwordError =
                    '비밀번호는 특수문자와 영어 그리고 숫자를 포함해야 하고 9글자 이상 15글자 이하로 구성돼야 합니다.';
                this.passwordValid = '';
            } else {
                this.passwordError = '';
                this.passwordValid = '사용 가능한 비밀번호입니다.';
            }
        },
        validatePasswordCheck() {
            if (this.password !== this.passwordCheck) {
                this.passwordCheckValid = '';
                this.passwordCheckError = '비밀번호가 일치하지 않습니다.';
            } else {
                this.passwordCheckValid = '비밀번호가 일치합니다.';
                this.passwordCheckError = '';
            }
        },
        validateNickname() {
            if (this.nickname.length < 2) {
                this.nicknameError = '닉네임은 최소 2글자 이상이어야 합니다.';
            } else if (this.nickname.length > 20) {
                this.nicknameError = '닉네임이 너무 깁니다.';
            } else {
                this.nicknameError = '';
            }
        },
        async signup() {
            this.validateEmail();
            this.validatePassword();
            this.validatePasswordCheck();
            this.validateNickname();
            if (
                this.emailError ||
                this.passwordError ||
                this.passwordCheckError ||
                this.nicknameError
            ) {
                this.signupError = '회원가입 양식 조건을 모두 만족시켜 주세요.';
                return;
            }
            await this.$store.dispatch({
                type: 'signupSubmit',
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
