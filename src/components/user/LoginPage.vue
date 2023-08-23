<template>
    <div class="box">
        <div class="loginbox">
            <h2 class="brand">Fndr.io</h2>
            <form @submit.prevent="login" novalidate>
                <div>
                    <label>Email</label>
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
                    <label>Password</label>
                    <input
                        type="password"
                        v-model="user.password"
                        :class="{
                            'is-invalid': message.passwordError,
                        }"
                        class="form-control"
                        required
                    />
                    <div class="invalid-feedback">
                        {{ message.passwordError }}
                    </div>
                </div>
                <div class="btn-box">
                    <button class="btn login" type="submit">Log in</button>
                    <button class="btn join" @click="toSignUp">Sign up</button>
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
        toSignUp() {
            this.$router.push('/signup');
        },
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.user.email)) {
                this.message.emailError = 'Please enter a valid email';
            } else {
                this.message.emailError = '';
            }
        },
        validatePassword() {
            if (this.user.password.length == 0) {
                this.message.passwordError = 'Please enter a password';
            } else {
                this.message.passwordError = '';
            }
        },
        async login() {
            this.validateEmail();
            this.validatePassword();
            if (this.message.emailError || this.message.passwordError) {
                return;
            } else {
                await this.$store.dispatch({
                    type: 'loginSubmit',
                    email: this.user.email,
                    password: this.user.password,
                });
                await this.$store.dispatch('checkLoginStatus');
            }
        },
    },
};
</script>

<style scoped>
.box {
    display: flex;
    width: 70rem;
    padding-top: 5rem;
    max-width: 70rem;
    margin: 0 auto;
    align-items: flex-start;
    justify-content: center;
}
.loginbox {
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
    background-color: #f73859;
}
.join {
    background-color: #dedede;
}
button:hover {
    opacity: 0.7;
}
label {
    color: #4e4e4e;
}
.invalid-feedback {
    font-size: 12px;
}
</style>
