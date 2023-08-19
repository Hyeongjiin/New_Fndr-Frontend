<template>
    <nav aria-label="Page navigation example" v-if="!isLoading">
        <ul class="pagination justify-content-end">
            <li class="page-item"><a class="page-link" href="#" @click.prevent="previous">Previous</a></li>
            <li class="page-item" v-for="page in pageNumbers" :key="page">
                <a class="page-link" :href="pageHref(page)" @click.prevent="$router.push(pageHref(page))">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" @click.prevent="next" :disabled="disableNext"
                    v-if="!disableNext">Next</a></li>
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
        totalPages: Number,
        isLoading: {
            type: Boolean,
            default: true,
        },

    },
    computed: {
        disableNext() {
            let disable = this.currentPage >= this.totalPages;
            return disable;
        },

        pageNumbers() {
            let startPage = Math.floor((this.currentPage - 1) / this.pagesToShow) * this.pagesToShow + 1;
            let endPage = Math.min(startPage + this.pagesToShow - 1, this.totalPages);

            let pageArray = [];
            for (let i = startPage; i <= endPage; i++) {
                pageArray.push(i);
            }

            console.log("Page Numbers:", pageArray);
            return pageArray;
        },
        pageHref() {
            return (pageNum) => {
                return {
                    name: 'search-jobs',
                    params: { page: pageNum },
                    query: this.$route.query
                };
            };
        }
    },
    methods: {
        next() {
            if (!this.disableNext) {
                this.$router.push({
                    name: 'search-jobs',
                    params: { page: parseInt(this.$route.params.page) + 1 },
                    query: this.$route.query
                });
            }
        },
        previous() {
            if (this.$route.params.page > 1) {
                this.$router.push({
                    name: 'search-jobs',
                    params: { page: parseInt(this.$route.params.page) - 1 },
                    query: this.$route.query
                });
            }
        }
    },
    watch: {
        '$route.params.page': function (newPage) {
            this.currentPage = parseInt(newPage);
        }
    },
    mounted() {
        console.log("Received totalPages prop:", this.totalPages);
    }
}
</script>