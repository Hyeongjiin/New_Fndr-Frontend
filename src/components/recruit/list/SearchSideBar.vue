<template>
    <div class="container">
        <div class="button">
            <button class="searchbutton">search</button>
        </div>
        <hr />
        <div class="sec1">
            <span> Search keyword </span>
            <input type="text" placeholder="keyworld" />
        </div>
        <div class="sec2">
            <hr />
            <span style="margin-left: 100px"> Location </span> <br />
            <input type="checkbox" /> <span>North America </span> <br />
            <input type="checkbox" /> <span>Europe </span> <br />
            <input type="checkbox" /> <span>Asia </span> <br />
            <input type="checkbox" /> <span>Oceania </span> <br />
            <hr />
            <input type="checkbox" /> <span> Visa suppot </span> <br />
            <input type="checkbox" /> <span> Fully remote </span> <br />
        </div>
    </div>
</template>


<style scoped>
.container {
    width: 276px;
    /* height: 570px; */
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    line-height: 29px;
    font: Noto Sans KR;
    /*  padding-top: 2rem;
          padding-bottom: 2rem; */
}

.button {
    margin-top: 3%;
    margin-bottom: 3%;
    display: flex;
    justify-content: center;
    padding: 12px, 0px, 12px, 0px;
    color: rgba(247, 56, 89, 1);
}

.searchbutton {
    width: 234px;
    height: 47px;
    border-radius: 50px;
    padding: 12px, 0px, 12px, 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sec1 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sec1>input {
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: center;
    border-radius: 10px;
    border: 1px solid;
    width: 235px;
    height: 49px;
}

.sec2>input {
    margin-left: 10%;
}
</style>