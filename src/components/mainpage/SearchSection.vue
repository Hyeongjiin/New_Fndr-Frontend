<template>

    <h1 id="top">{{title1}} <br> {{title2}} </h1>
       <div class="container" >
        <div class="input-wrapper">
          <input type="text" placeholder="Keyworld or Job title">
          <input type="text" placeholder="Country">
          <button><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg></button>
        </div>
      </div>

       <div class="button-box">
        <button id="button" > REMOTE </button>
        <button id="button" > VISA </button>
       </div>

</template>

<script>

export default ({
    data() {
        return{

            title1:"재택근무 해외이직/취업서치의 편리함",
            title2:"SolveWhatever"
        } 
        
    },
})

</script>

<style scoped>

*    {  
      letter-spacing: -1.5px;
      line-height: 180%; 
      }

      h1{
        line-height : 1.9;
        text-align : center;
        height: 126px;
        top: 150px;
        left: 327px;
         }

    #top{
        margin-top: 232px;
       }

      .container {
         display: flex;
         margin: 0 auto;
         width: 100px;
         justify-content: center;
       }
        
      .input-wrapper {
         margin-right: 0px;
         display:flex;
       }

       .input-wrapper > button {
         width: 80px;
         border-radius: 10px;
         background-color: #F73859;
         border: none;
       }

       .input-wrapper > button > svg {
        color:#fff;
       }
       
       .input-wrapper > input:first-child {
          margin: 0;
          text-align: center;
          width: 300px;
          border-right: 0;
          border-left: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          height: 70px;
          border-top: 1px solid #cccccc;
          /* border-radius: 1px; */
          border-radius: 10px 0px 0px 10px;
       }

       .input-wrapper > input:nth-child(2) {
        width: 200px;
        text-align: center;
        height: 70px;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        /* height: 70px; */
        border-top: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
        border-radius: 0px 10px 10px 0px;
        width: 200px;
        height:70px ;
        margin-right: 10px;
       }

       input::placeholder {
        color:rgba(173, 173, 173, 1);
        font-size: 1.6em;
        font-style: italic;
      }

      .container {
        display: flex;
        flex-direction: row;
      }
  
      .search-box { 
        flex: 1;
        width: 50%;
      }

      html {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
        }
  
      .button-box{
        display : flex;
        justify-content : center;
        align-items : center;
        margin-top : 26px;
        width: 268px;   
        margin:0 auto;
        margin-top: 26px;
      }


      .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .card {
        width: calc(50% - 10px); /* 카드의 가로 폭 조정 */
        margin-bottom: 20px; /* 다른 스타일링 속성들 */
      }

      .title {
        color: grey;
        font-size: 18px;
      }
      
      .button-box > button:first-child {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #F73859;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
        border-radius: 50px;
        margin-right: 10px;
      }

      .button-box > button:last-child {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #F73859;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
        border-radius: 50px;
        margin-left: 10px;
      }
      
      button:hover, a:hover {
        opacity: 0.7;
      }

</style>