<template>
    <div class="box">
        <div>
            <h2>Post a Review</h2>
            <form class="form" @submit.prevent="submitPostForm" novalidate>
                <div>
                    <label class="label-title required">글 제목</label>
                    <input type="title" v-model="post.title" placeholder="글제목은 여기에" :class="{
                        'is-invalid': message.title_error,
                    }" class="form-control" required />
                    <div class="invalid-feedback">
                        글 제목을 입력해주세요
                    </div>
                </div>
                <div>
                    <label class="label-title required">Description</label>
                    <TextEditor v-model="post.content" :class="{
                        'is-invalid': message.content_error,
                    }" class="form-control text-editor" required />
                    <div class="invalid-feedback">
                        콘텐츠를 입력해주세요
                    </div>
                </div>
                <div>
                    <label class="label-title">thumbnail</label>
                    <input class="logo-input" id="fileInput" type="file" ref="thumbnailInput" @change="previewImage" />
                    <label class="custom-file-label" for="fileInput">thumbnail 선택</label>
                </div>
                <div>
                    <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
                </div>
                <div class="review-post-error" v-if="this.message.review_post_error !== ''">
                    {{ this.message.review_post_error }}
                </div>
                <div class="btn-box">
                    <button class="btn post" type="submit">Post</button>
                    <button class="btn cancel" @click="cancel">Cancel</button>
                </div>
            </form>
        </div>
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
            post: {
                title: '' ,
                content: '',
            },
            message: {
                title_error: '',
                content_error: '',
                review_post_error: '',
            },
            imagePreview: null,
        };
    },
    methods: {
        cancel() {
            this.$router.push('/review/1');
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
        validateForm(fieldName) {
            if (this.post[fieldName].length === 0) {
                this.message[fieldName + '_error'] = fieldName + ' is required';
            } else {
                this.message[fieldName + '_error'] = '';
            }
        },
        async submitPostForm() {

            console.log(this.post); // 디버깅

            const datas = [
                'title',
                'content',
            ];
            for (let data of datas) {
                this.validateForm(data);
            }
            if (
                this.message.title_error ||
                this.message.content_error
            ) {
                this.message.review_post_error =
                    'Please satisfy all the conditions for creating the review post.';
                console.log(this.message.reivew_post_error);
                return;
            }

            const postData = new FormData();
            postData.append('title', this.post.title);
            postData.append('content', this.post.content);

            const thumbnailFile = this.$refs.thumbnailInput.files[0];

            postData.append('thumbnail', thumbnailFile);

            console.log("Data being sent: ", this.post);
            try {
                const response = await axios.post(
                    'http://localhost:8080/rest/review',
                    postData,
                    {
                        withCredentials: true,
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                                'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data.ResultCode === 'ERR_OK') {
                    const postId = response.data.postId;
                    this.$router.push(`/review/1`);
                }
                else {
                    console.log(response.data);
                    this.$router.push('/review/1');
                }
            } catch (error) {
                console.error('API 호출 중 에러 발생', error);
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

.cancel {
    color: #4e4e4e;
    background-color: #f5f5f5;
}

button:hover {
    opacity: 0.7;
}

.text-editor {
    height: 350px;
}

.review-post-error {
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

.form div {
    margin-top: 10px;
}

.required::after {
    content: '*';
    color: red;
    margin-left: 5px;
}
</style>
