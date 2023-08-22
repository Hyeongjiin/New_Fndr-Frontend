<template>
    <div>
        <h2>채용공고 등록</h2>
        <form @submit.prevent="submitPostForm" novalidate>
            <div>
                <div>
                    <label>Company Name</label>
                    <input
                        type="company_name"
                        v-model="post.company_name"
                        placeholder="The fndr Corporation"
                        :class="{ 'is-invalid': message.company_name_error }"
                        class="form-control"
                        required
                    />
                    <div class="invalid-feedback">회사명을 입력해주세요.</div>
                </div>
                <div>
                    <label>Company Email</label>
                    <input
                        type="email"
                        v-model="post.company_email"
                        @input="validateEmail"
                        placeholder="example@fndr.com"
                        :class="{ 'is-invalid': message.company_email_error }"
                        class="form-control"
                        required
                    />
                    <div>
                        Company email in case of any problems. Not publicly
                        visible.
                    </div>
                    <div class="invalid-feedback">
                        {{ message.company_email_error }}
                    </div>
                </div>
            </div>
            <div>
                <label>Company HomePage Link</label>
                <input
                    type="company_page_link"
                    v-model="post.company_page_link"
                    placeholder="https://fndr.com"
                    class="form-control"
                />
            </div>
            <div>
                <label>Job Title</label>
                <input
                    type="description_title"
                    v-model="post.description_title"
                    placeholder="fndr developer"
                    :class="{
                        'is-invalid': message.description_title_error,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    채용공고의 제목을 입력해주세요.
                </div>
            </div>
            <div>
                <label>Location</label>
                <input
                    type="location"
                    v-model="post.location"
                    placeholder="Example: Seoul / Remote / Anywhere"
                    :class="{
                        'is-invalid': message.location_error,
                    }"
                    class="form-control"
                    required
                />
                <div>
                    The Country, City, Address or Remote of the job posting
                </div>
                <div class="invalid-feedback">
                    채용공고에 해당하는 위치를 입력해주세요.
                </div>
            </div>
            <div>
                <label>Application URL</label>
                <input
                    type="company_apply_link"
                    v-model="post.company_apply_link"
                    placeholder="https://fndr.com/apply/software-developer"
                    :class="{
                        'is-invalid': message.company_apply_link_error,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    채용공고의 지원 링크을 입력해주세요.
                </div>
            </div>
            <div>
                <label>Salary Range</label>
                <input
                    type="salary"
                    v-model="post.salary"
                    class="form-control"
                />
            </div>
            <div>
                <div
                    :class="{
                        'is-invalid': message.is_remoted_error,
                    }"
                >
                    <label>Remote work</label>
                    <div>
                        <input
                            type="radio"
                            id="is_remoted_yes"
                            value="true"
                            v-model="post.is_remoted"
                            required
                        />
                        <label for="is_remoted_yes">possible</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="is_remoted_no"
                            value="false"
                            v-model="post.is_remoted"
                            :class="{
                                'is-invalid': message.is_remoted_error,
                            }"
                            required
                        />
                        <label for="is_remoted_no">impossible</label>
                    </div>
                </div>
                <div class="invalid-feedback">
                    원격 근무 여부를 확인해주세요.
                </div>
            </div>
            <div>
                <div
                    :class="{
                        'is-invalid': message.is_visa_sponsored_error,
                    }"
                >
                    <label>Visa support</label>
                    <div>
                        <input
                            type="radio"
                            id="is_visa_sponsored_yes"
                            value="true"
                            v-model="post.is_visa_sponsored"
                            required
                        />
                        <label for="is_visa_sponsored_yes">Possible</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="is_visa_sponsored_no"
                            value="false"
                            v-model="post.is_visa_sponsored"
                            :class="{
                                'is-invalid': message.is_visa_sponsored_error,
                            }"
                            required
                        />
                        <label for="is_visa_sponsored_no">Impossible</label>
                    </div>
                </div>
                <div class="invalid-feedback">
                    비자 지원 여부를 확인해주세요.
                </div>
            </div>
            <div>
                <div :class="{ 'is-invalid': message.contract_form_error }">
                    <label>Contract Form</label>
                    <div>
                        <input
                            type="radio"
                            id="full_time"
                            value='["Full-Time"]'
                            v-model="post.contract_form"
                            required
                        />
                        <label class="form-check-label" for="full_time"
                            >Full Time</label
                        >
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="part_time"
                            value='["Part-Time"]'
                            v-model="post.contract_form"
                            required
                        />
                        <label class="form-check-label" for="part_time"
                            >Part Time</label
                        >
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="contract"
                            value='["Contract"]'
                            v-model="post.contract_form"
                            required
                        />
                        <label class="form-check-label" for="contract"
                            >Contract</label
                        >
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="internship"
                            value='["Intership"]'
                            v-model="post.contract_form"
                            required
                        />
                        <label class="form-check-label" for="internship"
                            >Internship</label
                        >
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="temporary"
                            value='["Temporary"]'
                            v-model="post.contract_form"
                            required
                        />
                        <label class="form-check-label" for="temporary"
                            >Temporary</label
                        >
                    </div>
                </div>
                <div class="invalid-feedback">계약 형태를 선택해주세요.</div>
            </div>
            <div>
                <label>Skills / Tags</label>
                <input
                    type="tag"
                    v-model="tag_input"
                    placeholder="Example: Backend, MySQL, Java (Separated by comma)"
                    class="form-control"
                />
                <div>Example: Backend, MySQL, Java (Separated by comma)</div>
            </div>
            <div>
                <label>Job Description</label>
                <TextEditor
                    v-model="post.description_content"
                    :class="{
                        'is-invalid': message.description_content_error,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    채용공고의 내용을 입력해주세요.
                </div>
            </div>
            <div>Company Logo</div>
            <div>
                <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Image Preview"
                />
            </div>
            <div>
                <input
                    type="file"
                    ref="companyLogoInput"
                    @change="previewImage"
                />
            </div>
            <div v-if="this.message.job_post_error !== ''">
                {{ this.message.job_post_error }}
            </div>
            <div class="btn-box">
                <button class="btn post" type="submit">Post</button>
                <button class="btn cancle" @click="cancle">Cancle</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import TextEditor from '../../../components/editors/TextEditor.vue';

export default {
    components: {
        TextEditor,
    },
    data() {
        return {
            tag_input: '',
            tag_list: [],
            post: {
                company_name: '',
                company_email: '',
                description_title: '',
                description_content: '',
                company_apply_link: '',
                is_visa_sponsored: null,
                is_remoted: null,
                salary: '',
                contract_form: null,
                company_page_link: '',
                tag: '',
                location: '',
            },
            message: {
                company_name_error: '',
                company_email_error: '',
                description_title_error: '',
                description_content_error: '',
                company_apply_link_error: '',
                is_visa_sponsored_error: '',
                is_remoted_error: '',
                contract_form_error: '',
                location_error: '',
                job_post_error: '',
            },
            imagePreview: null,
        };
    },
    watch: {
        tag_input: function (newVal, oldVal) {
            this.tag_list = newVal.split(',').map((tag) => tag.trim());
            this.post.tag = JSON.stringify(this.tag_list);
        },
    },
    methods: {
        cancle() {
            this.$router.push('/');
        },
        previewImage(event) {
            const input = event.target;
            if (input.files && input.files[0]) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };

                reader.readAsDataURL(input.files[0]);
            }
        },
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(this.post.company_email)) {
                this.message.company_email_error =
                    '유효하지 않은 이메일 형식입니다.';
            } else {
                this.message.company_email_error = '';
            }
        },
        validateRadio(fieldName) {
            if (this.post[fieldName] === null) {
                this.message[fieldName + '_error'] = 'error';
            } else {
                this.message[fieldName + '_error'] = '';
            }
        },
        validateForm(fieldName) {
            if (this.post[fieldName].length === 0) {
                this.message[fieldName + '_error'] = fieldName + ' is required';
            } else {
                this.message[fieldName + '_error'] = '';
            }
        },
        async submitPostForm() {
            const datas = [
                'company_name',
                'company_email',
                'description_title',
                'description_content',
                'company_apply_link',
                'location',
            ];
            this.validateEmail();
            this.validateRadio('is_remoted');
            this.validateRadio('is_visa_sponsored');
            this.validateRadio('contract_form');
            console.log(this.post.contract_form);
            console.log(this.message.contract_form_error);
            for (let data of datas) {
                this.validateForm(data);
            }
            if (
                this.message.company_name_error ||
                this.message.company_email_error ||
                this.message.description_title_error ||
                this.message.description_content_error ||
                this.message.company_apply_link_error ||
                this.message.is_visa_sponsored_error ||
                this.message.is_remoted_error ||
                this.message.contract_form_error ||
                this.message.location_error
            ) {
                this.message.job_post_error =
                    '채용공고 생성 양식 조건을 모두 만족시켜 주세요.';
                console.log(this.message.job_post_error);
                return;
            }
            const postData = new FormData();
            for (let key in this.post) {
                postData.append(key, this.post[key]);
            }
            console.log(postData);
            const companyLogoFile = this.$refs.companyLogoInput.files[0];
            postData.append('company_logo', companyLogoFile);

            try {
                const response = await axios.post(
                    'http://localhost:8080/rest/job',
                    postData,
                    {
                        withCredentials: true,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                if (response.data.ResultCode === 'JobPost_Create_Success') {
                    const newCompanyLogo = response.data.companyLogo;
                    this.$store.commit('updateCompanyLogo', newCompanyLogo);
                    const postId = response.data.postId;
                    this.$router.push(`/detail/${postId}`);
                } else {
                    console.log(response.data.Message);
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
            }
        },
    },
};
</script>

<style scoped>
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
.post {
    background-color: #f73859;
}
.cancle {
    color: #4e4e4e;
    background-color: #f5f5f5;
}
button:hover {
    opacity: 0.7;
}
</style>
