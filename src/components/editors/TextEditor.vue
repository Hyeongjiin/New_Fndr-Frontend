<template>
    <quill-editor
        :value="modelValue"
        @input="handleInput"
        @change="onEditorChange"
        class="editor"
    ></quill-editor>
</template>

<script>
import { reactive } from 'vue';

export default {
    name: 'App',
    props: {
        modelValue: String,
    },
    emits: ['update:modelValue'],
    mounted() {
        this.$nextTick(() => {
            // Vue 컴포넌트 내 DOM 요소가 모두 로드된 후 실행
            const imageButton = document.querySelector('.ql-image');
            const videoButton = document.querySelector('.ql-video');
            imageButton.style.display = 'none';
            videoButton.style.display = 'none';
        });
    },
    setup(props, { emit }) {
        const state = reactive({
            content: '',
            _content: '',
            editorOption: {
                placeholder: '',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'],
                        ['link'],
                    ],
                },
                // more options
            },
            disabled: false,
        });

        const onEditorBlur = (quill) => {
            console.log('editor blur!', quill);
        };
        const onEditorFocus = (quill) => {
            console.log('editor focus!', quill);
        };
        const onEditorReady = (quill) => {
            console.log('editor ready!', quill);
        };
        const handleInput = (newValue) => {
            emit('update:modelValue', newValue);
            console.log(newValue);
        };
        const onEditorChange = ({ quill, html, text }) => {
            handleInput(html);
        };

        setTimeout(() => {
            state.disabled = true;
        }, 2000);

        return {
            state,
            onEditorBlur,
            onEditorFocus,
            onEditorReady,
            handleInput,
            onEditorChange,
        };
    },
};
</script>

<style scoped></style>
