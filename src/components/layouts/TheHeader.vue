<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <span class="navbar-brand"><router-link to="/" @click="refreshIfSameRoute">Fndr.io</router-link></span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            to="/job-post"
                            @click="refreshIfSameRoute"
                            >Post</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link active"
                            aria-current="page"
                            to="/search-jobs/1"
                            @click="refreshIfSameRoute"
                            >Search Jobs</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click="refreshIfSameRoute">Review</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click="refreshIfSameRoute">Community</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" v-if="!this.$store.state.isLoggedIn" to="/login"
                            @click="refreshIfSameRoute">Login/SignUp</router-link>
                        <router-link class="nav-link" v-else @click="this.$store.dispatch('logoutSubmit')"
                            to="/">Logout</router-link>
                    </li>
                    <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        refreshIfSameRoute(event) {
            if (this.$route.path === event.currentTarget.getAttribute('href')) {
                location.reload();
            }
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap');

a {
    text-decoration: none;
    color: #4e4e4e;
}

.bg-body-tertiary {
    box-shadow: 0px 3px 8px 1px rgba(233, 233, 233, 0.75);
    /* -webkit-box-shadow: 0px 3px 8px 5px rgba(97, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 8px 5px rgba(97, 0, 0, 0.75); */
}

.navbar-brand {
    font-family: 'Gasoek One', sans-serif;
    color: #f73859;
}

.navbar-brand>a {
    text-decoration: none;
    font-family: 'Gasoek One', sans-serif;
    color: #f73859;
}

.navbar-brand {
    margin-right: 0;
}

.navbar-expand-lg .navbar-collapse {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    display: flex !important;
    flex-basis: auto;
    justify-content: flex-end;
    letter-spacing: -0.5px;
}
</style>
