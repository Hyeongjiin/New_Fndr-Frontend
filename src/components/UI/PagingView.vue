<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item"><a class="page-link" href="#" @click="previous">Previous</a></li>
            <li class="page-item" v-for="page in pageNumbers" :key="page">
                <a class="page-link" :href="`/search-jobs/${page}`">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" @click="next" :disabled="disableNext">Next</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            currentPage: parseInt(this.$route.params.page) || 1,
            pagesToShow: 5
        }
    },
    props: {
        lastLoadedPage: Number,
        hasMorePages: Boolean,

    },
    computed: {
        disableNext() {
            return !this.hasMorePages || parseInt(this.$route.params.page) >= this.lastLoadedPage;
        },
        pageNumbers() {
            let startPage = Math.floor((this.currentPage - 1) / this.pagesToShow) * this.pagesToShow + 1;
            let endPage = startPage + this.pagesToShow - 1;
            let pageArray = [];

            for (let i = startPage; i <= endPage; i++) {
                pageArray.push(i);
            }

            return pageArray;
        }
    },
    methods: {
        next() {
            if (!this.disableNext) {
                this.$router.push(`/search-jobs/${parseInt(this.$route.params.page) + 1}`);
            }
        },
        previous() {
            if (this.$route.params.page > 1) {
                this.$router.push(`/search-jobs/${parseInt(this.$route.params.page) - 1}`);
            }
        }
    },
    watch: {
        '$route.params.page': function (newPage) {
            this.currentPage = parseInt(newPage);
        }
    }
}
</script>