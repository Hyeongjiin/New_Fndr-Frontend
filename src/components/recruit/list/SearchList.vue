<template>
    <li class="search-list">
        <base-card v-for="(item, index) in articles" :key="index">
            <div class="Search-section1">
                <div class="info">
                    <h3>{{ item.description_title }}</h3>
                    <ul>
                        <li><i class="bi bi-building-fill"></i> {{ item.company_name }}</li>
                        <li><i class="bi bi-geo-alt-fill"></i> {{ item.location }}</li>
                        <li v-if="item.is_remoted === true"><i class="bi bi-house-check"></i> Remote</li>
                        <li v-if="item.is_visa_sponsored == true"><i class="bi bi-card-checklist"></i> visa support</li>
                    </ul>
                </div>
                <div  v-if="item.company_logo !== null" class="info-img">
                    <!--이미지 넣어야 됨-->
                </div>
            </div>
            <!-- <div v-html="item.description_content" class="description">
            </div> -->
        </base-card>
    </li>
</template>
<script>
export default {
    data() {
        return {
            articles: []
        }
    },
    mounted() {

        fetch('http://localhost:8080/rest/search/1?visa=true', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(response => response.json())
            .then(data => console.log(this.articles = data.Response.recruit_post_list
            ))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
}

</script>

<style scoped>
* {
    font-size: 16px;
}

.search-list {
    width: 50rem;
    list-style-type: none;
}

.Search-section1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
}

.info-img {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: block;
    background-color: #F73859;
}

.info {
    display: flex;
    max-width: 36rem;
    flex-direction: column;
    align-items: flex-start;
}

.info>ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.info>ul>li {
    float: left;
    margin-left: 10px;
}

.info>ul>li:first-child {
    margin-left: 0px;
}

.info>h3 {
    font-size: 25px;
    font-weight: 700;
}

.bi {
    color: #F73859;
}

.description {
    padding: 20px;
    width: auto;
    height: 3rem;
    border-radius: 10px;
    background: #E3E3E3;
    display: inline-block;
}

</style>
