<template>
    <div class="box">
        <div class="signupbox">
            <h2 class="brand">Fndr.io</h2>
            <form @submit.prevent="signup" novalidate>
                <div>
                    <label>Email</label>
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
                    <label>Password</label>
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
                    <div class="valid-feedback">
                        {{ message.passwordValid }}
                    </div>
                    <div class="invalid-feedback">
                        {{ message.passwordError }}
                    </div>
                </div>
                <div>
                    <label>Password Check</label>
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
                    <label>Nickname</label>
                    <input
                        type="nickname"
                        v-model="user.nickname"
                        @input="validateNickname"
                        :class="{ 'is-invalid': message.nicknameError }"
                        class="form-control"
                        required
                    />
                    <div class="invalid-feedback">
                        {{ message.nicknameError }}
                    </div>
                </div>
                <div
                    class="signup-error"
                    v-if="this.message.signupError !== ''"
                >
                    {{ this.message.signupError }}
                </div>
                <div class="btn-box">
                    <button class="btn join" type="submit">Sign up</button>
                    <button class="btn login" @click="toLogin">Log in</button>
                </div>
            </form>
        </div>
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
        toLogin() {
            this.$router.push('/login');
        },
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.user.email)) {
                this.message.emailError = 'Invalid email format';
            } else {
                this.message.emailError = '';
            }
        },
        validatePassword() {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{9,15}$/;
            if (!passwordRegex.test(this.user.password)) {
                this.message.passwordError =
                    'The password must include special characters, letters, and numbers, and be between 9 and 15 characters in length.';
                this.message.passwordValid = '';
            } else {
                this.message.passwordError = '';
                this.message.passwordValid = 'Valid password';
            }
        },
        validatePasswordCheck() {
            if (this.user.password !== this.user.passwordCheck) {
                this.message.passwordCheckValid = '';
                this.message.passwordCheckError = 'Passwords do not match';
            } else if (this.user.passwordCheck.length == 0) {
                this.message.passwordCheckError = 'Please enter a password';
            } else {
                this.message.passwordCheckValid = 'Passwords match';
                this.message.passwordCheckError = '';
            }
        },
        validateNickname() {
            if (this.user.nickname.length < 2) {
                this.message.nicknameError =
                    'Nickname must be at least 2 characters long';
            } else if (this.user.nickname.length > 20) {
                this.message.nicknameError = 'Nickname is too long';
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
                    'Please satisfy all the sign-up form conditions';
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

<style scoper>
.box {
    display: flex;
    width: 70rem;
    padding-top: 5rem;
    max-width: 70rem;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: center;
}
.signupbox {
    display: flex;
    border-color: rgba(217, 217, 217, 1);
    height: auto;
    width: 20rem;
    /* text-align: center; */
    padding: 30px;
    border-radius: 15px;
    background-color: rgba(248, 248, 248, 1);
    flex-direction: column;
    align-items: center;
}
.brand {
    font-family: 'Gasoek One', sans-serif;
    color: #f73859;
}
.btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 26px;
    width: 268px;
    margin: 0 auto;
    margin-top: 26px;
}
.btn {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 12px;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    margin: 10px;
    height: 50px;
    width: 230px;
    font-size: 18px;
    border-radius: 15px;
}
.login {
    background-color: #dedede;
}
.join {
    background-color: #f73859;
}
button:hover {
    opacity: 0.7;
}
label {
    color: #4e4e4e;
    font-size: 13px;
}
.valid-feedback {
    font-size: 12px;
}
.invalid-feedback {
    font-size: 12px;
}
.signup-error {
    font-size: 15px;
    color: #dd3a49;
}
</style>
