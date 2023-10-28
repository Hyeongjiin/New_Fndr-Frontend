<template>
    <div class="editBox">
        <h1>
            Edit infomation
        </h1>
        <form class="form" @submit.prevent="
            submitUpdateForm(this.$store.state.user.id)
            " novalidate>
            <div class="row">
                <fieldset disabled>
                    <div class="col-sm-12">
                        <label class="label-title required">Email Address</label>
                        <input type="email" v-model="post.email" class="form-control" />
                    </div>
                </fieldset>
                <div class="col-sm-12">
                    <label class="label-title required">Nickname</label>
                    <input type="text" v-model="post.name" class="form-control" />
                </div>
            </div>
            <div class="btn-box">
                <div>
                    <ul>
                        <li data-bs-toggle="modal" data-bs-target="#passwordChangeModal">Change Password</li>
                        <li>|</li>
                        <li data-bs-toggle="modal" data-bs-target="#accountDeleteModal">Delete this account</li>
                    </ul>
                </div>
                <button class="btn post" type="submit">Edit</button>
            </div>
        </form>
    </div>
    <!-- 모달 -->
    <div class="modal fade" id="passwordChangeModal" tabindex="-1" aria-labelledby="passwordChangeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <form>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="passwordChangeModalLabel">Change Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" v-model="currentPassword" class="form-control"
                                autocomplete="on">
                        </div>
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <input type="password" id="newPassword" v-model="newPassword" class="form-control"
                                autocomplete="off">
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control"
                                autocomplete="off">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="changePassword" class="btn post">Change</button>
                        <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- 회원 탈퇴 모달 -->
    <div class="modal fade" id="accountDeleteModal" tabindex="-1" aria-labelledby="accountDeleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="accountDeleteModalLabel">Delete Account</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete your account? This action cannot be undone.
                    <div class="form-check mt-3">
                        <input type="checkbox" class="form-check-input" id="deleteConfirmCheckbox"
                            v-model="isDeleteConfirmed">
                        <label class="form-check-label" for="deleteConfirmCheckbox">I understand the consequences and want
                            to
                            delete my account.</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="deleteAccount" class="btn btn-danger" :disabled="!isDeleteConfirmed">Delete</button>
                    <button type="button" data-bs-dismiss="modal" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
const apiUrl = `${process.env.VUE_APP_API_URL}`
export default {
    async created() {
        await this.$store.dispatch("refreshUserFromLocalStorage");

        // console.log('After dispatch:', this.$store.state.user); // 스토어 상태 디버깅용

        this.post.name = this.$store.state.user.name
        this.post.email = this.$store.state.user.email
    },
    watch: {
        '$store.state.user.nickname': function (newVal, oldVal) {
            this.post.name = newVal;
        },
        '$store.state.user.email': function (newVal, oldVal) {
            this.post.email = newVal;
        }
    },
    data() {
        return {
            localNickname: this.$store.state.user.name,
            post: {
                email: this.$store.state.user.email,
                name: this.$store.state.user.name,
            },
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            isDeleteConfirmed: false,
        };
    },
    methods: {
        async submitUpdateForm() {
            const updateData = {
                nickname: this.post.name
            };

            try {
                const response = await axios.patch(
                    `${apiUrl}/auth/nickname`,

                    updateData,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                if (response.data.ResultCode === 'Nickname_Change_Success') {
                    console.log(response.data.Message);
                    this.$store.commit('UPDATE_NICKNAME', this.post.name);
                    localStorage.setItem('user', JSON.stringify(this.$store.state.user));
                    location.reload();
                } else {
                    console.log(response.data.Message);
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
            }
        },
        async changePassword() {
            if (this.newPassword !== this.confirmPassword) {
                alert("New Password and Confirm Password do not match!");
                return;
            }

            try {
                // 1 현재 비밀번호 체크 api 호출
                const checkResponse = await axios.post(`${apiUrl}/auth/password`, {
                    password: this.currentPassword,
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (checkResponse.data.ResultCode !== "Password_Match") {
                    alert(checkResponse.data.Message);
                    return;
                }

                // 2 비밀번호 변경 api 호출
                const changeResponse = await axios.patch(`${apiUrl}/auth/password`, {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (changeResponse.data.ResultCode === "Password_Change_Success") {
                    alert(changeResponse.data.Message);
                    const modalElement = document.getElementById('passwordChangeModal');
                    modalElement.classList.remove('show');
                    document.body.classList.remove('modal-open');
                    document.querySelector('.modal-backdrop').remove();
                } else {
                    alert(changeResponse.data.Message);
                }

            } catch (error) {
                console.error('Error occurred while calling API', error);
                alert("An error occurred while changing your password. Please try again.");
            }
        },
        async deleteAccount() {
        try {
            const response = await axios.delete(`${apiUrl}/auth/account`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.ResultCode === 'Account_Delete_Success') {
                document.querySelector('.modal-backdrop').remove();
                alert('Account successfully deleted.');
                this.$router.push('/login'); // 탈퇴 후 로그인 페이지로 리디렉션
            } else {
                alert(response.data.Message);
            }
        } catch (error) {
            console.error('API 호출 중 에러 발생', error);
            alert("회원 탈퇴 중 오류가 발생하였습니다. 다시 시도해주세요.");
        }
    },
    }
}
</script>

<style scoped>
* {
    font-size: 16px;
    color: #4E4E4E;
}

.editBox {
    border-radius: 12px;
    box-shadow: 0px 3px 8px 1px rgba(233, 233, 233, 0.75);
    padding: 2rem;
    border: #d9d9d9 1px solid;
    /* margin: 0 auto; */
    margin-bottom: 20px;
    background-color: #f8f8f8;
    width: 35rem;
}

hr {
    margin: 40px 0;
}

h1 {
    font-size: 25px;
    /* text-transform: uppercase; */
    font-weight: 700;
    margin-bottom: 2rem;
}

.btn-box {
    display: flex;
    padding-top: 20px;
    width: auto;
    justify-content: space-between;
    align-items: center;
}

.btn-box>div>ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.btn-box>div>ul>li {

    font-size: 13px;
    color: #ADADAD;
    cursor: pointer;
}

.btn-box>div>ul>li:first-child {
    margin-right: 10px
}

.btn-box>div>ul>li:last-child {
    margin-left: 10px
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
    height: 50px;
    width: 126px;
    font-size: 18px;
    border-radius: 15px;
}

.post {
    background-color: #f73859;
}


button:hover {
    opacity: 0.7;
}

.form div {
    margin-top: 10px;
}

.required::after {
    content: '*';
    color: red;
    margin-left: 5px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group:nth-of-type(1) {
    margin-bottom: 40px;
}

.modal-title {
    font-size: 24px;
    font-weight: bold;
}
</style>
