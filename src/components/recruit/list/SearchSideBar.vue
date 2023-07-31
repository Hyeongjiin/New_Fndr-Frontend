<template>
        <div class="container">

            <div class="button">
                <button class="searchbutton">search</button>
            </div>

            <hr />
            <div class="sec1">
                <div> Search keyword </div>
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

        display:inline-block;
        margin-left: 0;
        margin-right: 0;

        width: 260px;
        height: 500px;
        

        background-color: #ffffff;
        border-radius: 10px;
        border: 1px solid rgba(217, 217, 217, 1);
        line-height: 29px;
        font: Noto Sans KR;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem; 

    }
    
    .button {
        margin-top: 3%;
        margin-bottom: 3%;
        display: inline-block;
        justify-content: center;
        padding: 12px, 0px, 12px, 0px;
        
    }
    
    .searchbutton {
        width: 234px;
        height: 47px;
        border-radius: 50px;
        padding: 12px, 0px, 12px, 0px;
        display: inline-block;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #F73859;
        
    }
    
    .sec1 {
        display: block;
        flex-direction: column; 
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
    
