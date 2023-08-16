<template>
    <div>
        <h2>채용공고 등록</h2>
        <form @submit.prevent="submitPostForm" novalidate>
            <div>
                <label>회사명</label>
                <input
                    type="company_name"
                    v-model="post.company_name"
                    placeholder="회사명"
                    :class="{ 'is-invalid': message.company_name_error }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">회사명을 입력해주세요.</div>
            </div>
            <div>
                <label>회사 연락처</label>
                <input
                    type="email"
                    v-model="post.company_email"
                    @input="validateEmail"
                    placeholder="회사 연락처"
                    :class="{ 'is-invalid': message.company_email_error }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    {{ message.company_email_error }}
                </div>
            </div>
            <div>
                <label>제목</label>
                <input
                    type="description_title"
                    v-model="post.description_title"
                    placeholder="채용공고 제목"
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
                <label>내용</label>
                <input
                    type="description_content"
                    v-model="post.description_content"
                    placeholder="채용공고 내용"
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
            <div>
                <label>채용지원 링크</label>
                <input
                    type="company_apply_link"
                    v-model="post.company_apply_link"
                    placeholder="채용공고 지원 링크"
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
                <div
                    :class="{
                        'is-invalid': message.is_remoted_error,
                    }"
                >
                    <label>원격근무 여부</label>
                    <div>
                        <input
                            type="radio"
                            id="is_remoted_yes"
                            value="true"
                            v-model="post.is_remoted"
                            required
                        />
                        <label for="is_remoted_yes">가능</label>
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
                        <label for="is_remoted_no">불가능</label>
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
                    <label>비자 지원 여부</label>
                    <div>
                        <input
                            type="radio"
                            id="is_visa_sponsored_yes"
                            value="true"
                            v-model="post.is_visa_sponsored"
                            required
                        />
                        <label for="is_visa_sponsored_yes">가능</label>
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
                        <label for="is_visa_sponsored_no">불가능</label>
                    </div>
                </div>
                <div class="invalid-feedback">
                    비자 지원 여부를 확인해주세요.
                </div>
            </div>
            <div>
                <label>급여 범위</label>
                <input
                    type="salary"
                    v-model="post.salary"
                    placeholder="급여 범위"
                />
            </div>
            <div>
                <div :class="{ 'is-invalid': message.contract_form_error }">
                    <label>계약 형태</label>
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
                <label>회사 홈페이지 링크</label>
                <input
                    type="company_page_link"
                    v-model="post.company_page_link"
                    placeholder="회사 홈페이지 링크"
                />
            </div>
            <div>
                <label>태그</label>
                <input
                    type="tag"
                    v-model="post.tag"
                    placeholder="채용공고 관련 태그들"
                />
            </div>
            <div>
                <label>채용 위치</label>
                <input
                    type="location"
                    v-model="post.location"
                    placeholder="채용 위치"
                    :class="{
                        'is-invalid': message.location_error,
                    }"
                    class="form-control"
                    required
                />
                <div class="invalid-feedback">
                    채용공고에 해당하는 위치를 입력해주세요.
                </div>
            </div>
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
            <div>
                <button type="submit">등록하기</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
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
    methods: {
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
