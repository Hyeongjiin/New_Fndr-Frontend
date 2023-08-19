<template>
    <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="signup" novalidate>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    v-model="user.email"
                    @input="validateEmail"
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
                    @input="validatePassword"
                    :class="{
                        'is-invalid': message.passwordError,
                        'is-valid': message.passwordValid,
                    }"
                    class="form-control"
                    required
                />
                <div class="valid-feedback">{{ message.passwordValid }}</div>
                <div class="invalid-feedback">{{ message.passwordError }}</div>
            </div>
            <div>
                <label>Password Check:</label>
                <input
                    type="password"
                    v-model="user.passwordCheck"
                    @input="validatePasswordCheck"
                    :class="{
                        'is-invalid': message.passwordCheckError,
                        'is-valid': message.passwordCheckValid,
                    }"
                    class="form-control"
                    required
                />
                <div class="valid-feedback">
                    {{ message.passwordCheckValid }}
                </div>
                <div class="invalid-feedback">
                    {{ message.passwordCheckError }}
                </div>
            </div>
            <div>
                <label>Nickname:</label>
                <input
                    type="nickname"
                    v-model="user.nickname"
                    @input="validateNickname"
                    :class="{ 'is-invalid': message.nicknameError }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">{{ message.nicknameError }}</div>
            </div>
            <div v-if="this.message.signupError !== ''">
                {{ this.message.signupError }}
            </div>
            <button type="submit">회원가입</button>
            <router-link to="/login"><button>로그인하기</button></router-link>
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
                passwordCheck: '',
                nickname: '',
            },
            message: {
                emailError: '',
                passwordValid: '',
                passwordError: '',
                passwordCheckValid: '',
                passwordCheckError: '',
                nicknameError: '',
                signupError: '',
            },
        };
    },
    methods: {
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.user.email)) {
                this.message.emailError = '유효하지 않은 이메일 형식입니다.';
            } else {
                this.message.emailError = '';
            }
        },
        validatePassword() {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/;
            if (!passwordRegex.test(this.user.password)) {
                this.message.passwordError =
                    '비밀번호는 특수문자와 영어 그리고 숫자를 포함해야 하고 9글자 이상 15글자 이하로 구성돼야 합니다.';
                this.message.passwordValid = '';
            } else {
                this.message.passwordError = '';
                this.message.passwordValid = '사용 가능한 비밀번호입니다.';
            }
        },
        validatePasswordCheck() {
            if (this.user.password !== this.user.passwordCheck) {
                this.message.passwordCheckValid = '';
                this.message.passwordCheckError =
                    '비밀번호가 일치하지 않습니다.';
            } else if (this.user.passwordCheck.length == 0) {
                this.message.passwordCheckError = '비밀번호를 입력해주세요.';
            } else {
                this.message.passwordCheckValid = '비밀번호가 일치합니다.';
                this.message.passwordCheckError = '';
            }
        },
        validateNickname() {
            if (this.user.nickname.length < 2) {
                this.message.nicknameError =
                    '닉네임은 최소 2글자 이상이어야 합니다.';
            } else if (this.user.nickname.length > 20) {
                this.message.nicknameError = '닉네임이 너무 깁니다.';
            } else {
                this.message.nicknameError = '';
            }
        },
        async signup() {
            this.validateEmail();
            this.validatePassword();
            this.validatePasswordCheck();
            this.validateNickname();
            if (
                this.message.emailError ||
                this.message.passwordError ||
                this.message.passwordCheckError ||
                this.message.nicknameError
            ) {
                this.message.signupError =
                    '회원가입 양식 조건을 모두 만족시켜 주세요.';
                return;
            }
            await this.$store.dispatch({
                type: 'signupSubmit',
                email: this.user.email,
                name: this.user.nickname,
                password: this.user.password,
            });
            await this.$store.dispatch({
                type: 'loginSubmit',
                email: this.user.email,
                password: this.user.password,
            });
            await this.$store.dispatch('checkLoginStatus');
        },
    },
};
</script>
