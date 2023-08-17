<template>
    <div>
        <h2>채용공고 수정</h2>
        <form
            @submit.prevent="submitUpdateForm(this.$store.state.jobDetail.id)"
            novalidate
        >
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
                    v-model="tag_input"
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
            <div>기존 로고</div>
            <div>
                <img
                    v-if="this.$store.state.jobDetail.company_logo !== null"
                    :src="imgUrl + this.$store.state.jobDetail.company_logo"
                    alt="Company Logo"
                />
            </div>
            <div>새로운 로고</div>
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

            <button type="submit">수정하기</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tag_input: this.$store.state.jobDetail.tag,
            tag_list: [],
            post: {
                company_name: this.$store.state.jobDetail.company_name,
                company_email: this.$store.state.jobDetail.company_email,
                description_title:
                    this.$store.state.jobDetail.description_title,
                description_content:
                    this.$store.state.jobDetail.description_content,
                company_apply_link:
                    this.$store.state.jobDetail.company_apply_link,
                is_visa_sponsored:
                    this.$store.state.jobDetail.is_visa_sponsored,
                is_remoted: this.$store.state.jobDetail.is_remoted,
                salary: this.$store.state.jobDetail.salary,
                contract_form: this.$store.state.jobDetail.contract_form,
                company_page_link:
                    this.$store.state.jobDetail.company_page_link,
                tag: '',
                location: this.$store.state.jobDetail.location,
                old_company_logo: this.$store.state.jobDetail.company_logo,
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
            imgUrl: 'http://localhost:8080/',
            imagePreview: null,
        };
    },
    mounted() {
        if (this.tag_input) {
            this.tag_input = JSON.parse(this.tag_input);
            this.tag_input = this.tag_input.join(', ');
        }
    },
    watch: {
        tag_input: function (newVal, oldVal) {
            this.tag_list = newVal.split(',').map((tag) => tag.trim());
            this.post.tag = JSON.stringify(this.tag_list);
        },
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
            } else {
                this.imagePreview = null;
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
        async submitUpdateForm(postId) {
            const datas = [
                'company_name',
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
                    '채용공고 수정 양식 조건을 모두 만족시켜 주세요.';
                console.log(this.message.job_post_error);
                return;
            }
            const updateData = new FormData();
            for (let key in this.post) {
                updateData.append(key, this.post[key]);
            }
            for (let [key, value] of updateData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const companyLogoFile = this.$refs.companyLogoInput.files[0];
            updateData.append('company_logo', companyLogoFile);

            try {
                const response = await axios.patch(
                    `http://localhost:8080/rest/job/${postId}`,
                    updateData,
                    {
                        withCredentials: true,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                if (
                    response.data.ResultCode === 'JobPost_Update_Success' ||
                    response.data.ResultCode === 'JobPost_No_Update'
                ) {
                    const postId = this.$store.state.jobDetail.id;
                    let newCompanyLogo = response.data.company_logo;
                    if (!newCompanyLogo) {
                        newCompanyLogo =
                            this.$store.state.jobDetail.company_logo;
                    }
                    this.$store.commit('updateCompanyLogo', newCompanyLogo);
                    this.$router.push(`/detail/${postId}`);
                    console.log(response.data.Message);
                } else {
                    console.log(response.data.Message);
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
            }
        },
    },
};
</script>
