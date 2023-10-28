<template>
    <div class="container">
        <div class="sidebar-section">
            <h1>My Page</h1>
        </div>
        <div class="sidebar-section">
            <router-link to="/mypage/edit-info" @click="refreshIfSameRoute">
                <h3><i class="bi bi-person-circle"></i> edit
                    infomation</h3>
            </router-link>

            <router-link to="/mypage/my-posting" @click="refreshIfSameRoute">
                <h3><i class="bi bi-file-text"></i> my posting</h3>
            </router-link>

            <router-link to="/mypage/my-review" @click="refreshIfSameRoute">
                <h3><i class="bi bi-pencil-square"></i> my review</h3>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {

    },
    computed: {
    },
    watch: {
    }
}
</script>
    
<style scoped>
* {
    color: #4E4E4E;
}

a {
    text-decoration: none;
    color: #4e4e4e;
}

h1 {
    font-size: 25px;
    /* text-transform: uppercase; */
    font-weight: 700;
    margin-bottom: 1rem;
}

h3 {
    font-size: 16px;
    /* text-transform: uppercase; */
    font-weight: 700;
    margin-bottom: 1rem;
}

.container {
    display: flex;
    margin-left: 0;
    margin-right: 2rem;
    width: 18rem;
    height: auto;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    line-height: 29px;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: sticky;
    top: 50px;
}


.sidebar-section {
    width: 100%;
    display: block;
    flex-direction: column;
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid #D9D9D9;
}

.sidebar-section:last-child {
    padding-bottom: 0px;
    border-bottom: 0;
    padding-top: 30px;
}


.bi {
    color: #F73859;
    margin-right: 5px;
}
</style>
    
