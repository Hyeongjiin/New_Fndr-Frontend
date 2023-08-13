<template>
    <div>
        <h2>채용공고 등록</h2>
        <form @submit.prevent="submitPostForm">
            <div>
                <label>회사명</label>
                <input
                    type="company_name"
                    v-model="post.company_name"
                    placeholder="회사명"
                    required
                />
            </div>
            <div>
                <label>회사 연락처</label>
                <input
                    type="email"
                    v-model="post.company_contact"
                    placeholder="회사 연락처"
                    required
                />
            </div>
            <div>
                <label>제목</label>
                <input
                    type="description_title"
                    v-model="post.description_title"
                    placeholder="채용공고 제목"
                    required
                />
            </div>
            <div>
                <label>내용</label>
                <input
                    type="description_content"
                    v-model="post.description_content"
                    placeholder="채용공고 내용"
                    required
                />
            </div>
            <div>
                <label>채용지원 링크</label>
                <input
                    type="company_apply_link"
                    v-model="post.company_apply_link"
                    placeholder="채용공고 지원 링크"
                    required
                />
            </div>
            <div>
                <label>비자 지원 여부</label>
                <input
                    type="checkbox"
                    v-model="post.is_visa_sponsored"
                    required
                />
                비자 지원 가능
            </div>
            <div>
                <label>원격 근무 가능 여부</label>
                <input type="checkbox" v-model="post.is_remoted" required />
                원격근무 가능
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
                <label>계약 형태</label>
                <input
                    type="checkbox"
                    v-model="post.contract_form"
                    placeholder="계약 형태"
                />
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
                    required
                />
            </div>

            <!-- Image Input -->
            <input type="file" ref="companyLogoInput" />

            <button type="submit">등록하기</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: {
                nation_id: 1,
                is_dev: true,
                company_name: '',
                company_contact: '',
                description_title: '',
                description_content: '',
                company_apply_link: '',
                is_visa_sponsored: false,
                is_remoted: true,
                salary: '',
                contract_form: '',
                company_page_link: '',
                tag: '',
                location: '',
            },
            message: {},
        };
    },
    methods: {
        async submitPostForm() {
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
                    // 성공 처리
                    alert(response.data.Message);
                } else {
                    // 오류 처리
                    alert(response.data.Message);
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
            }
        },
    },
};
</script>
