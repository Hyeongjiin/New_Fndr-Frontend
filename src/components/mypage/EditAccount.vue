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
            <!-- <hr> -->
            <!-- <div class="row">
                <div class="col-sm-12">
                    <label class="label-title required">Currunt Password</label>
                    <input type="password" @input="validateEmail" class="form-control" required />
                </div>
                <div class="col-sm-12">
                    <label class="label-title required">Change Password</label>
                    <input type="password" @input="validateEmail" class="form-control" required />
                </div>
                <div class="col-sm-12">
                    <label class="label-title required">Confirm Password </label>
                    <input type="password" @input="validateEmail" class="form-control" required />
                </div>
            </div> -->
            <div class="btn-box">
                <div>
                    <ul>
                        <li>Change Password</li>
                        <li>|</li>
                        <li>Delete this account</li>
                    </ul>
                </div>
                <button class="btn post" type="submit">Edit</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
const apiUrl = `${process.env.VUE_APP_API_URL}`
export default {
    data() {
        return {
            post: {
                email: this.$store.state.user.email,
                name: this.$store.state.user.name,
            }
        };
    },
    methods: {
        async submitUpdateForm(postId) {
            const updateData = {
                name: this.post.name
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
                } else {
                    console.log(response.data.Message);
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
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

.cancel {
    color: #4e4e4e;
    background-color: #e1e1e1;
}

button:hover {
    opacity: 0.7;
}

.contact-info {
    color: #707891;
    font-size: 15px;
}

.location-info {
    color: #707891;
    font-size: 15px;
}

.tag-info {
    color: #707891;
    font-size: 17px;
}

.text-editor {
    height: 350px;
}

.job-post-error {
    font-size: 15px;
    color: #dd3a49;
}

.logo-input {
    display: none;
}

.custom-file-label {
    padding: 10px 15px;
    background-color: #f5f5f5;
    color: #3d3d3d;
    border: none;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.label-title {
    font-size: 17px;
}

.contract-type {
    display: flex;
    justify-content: space-between;
}

.contract-type div {
    display: flex;
    align-items: center;
    margin-right: 40px;
}

.contract-type div input {
    margin-right: 10px;
}

.remote {
    display: flex;
}

.remote div {
    display: flex;
    align-items: center;
    margin-left: 50px;
}

.remote div input {
    margin-right: 10px;
}

.visa {
    display: flex;
}

.visa div {
    display: flex;
    align-items: center;
    margin-left: 50px;
}

.visa div input {
    margin-right: 10px;
}

[type='radio'] {
    display: none;
}

[type='radio']+label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #555;
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: middle;
}

[type='radio']:checked+label::before {
    background: #f73859;
}

.form div {
    margin-top: 10px;
}

.required::after {
    content: '*';
    color: red;
    margin-left: 5px;
}
</style>
