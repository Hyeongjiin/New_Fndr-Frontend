    <template>

        <img src="img.jpg" alt="company picture" style="width:173px">
        
        <p class="title">company name</p>

        <section class="textbox">

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg> <span>location</span><br>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg> <span>visa support</span><br>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg> <span>website</span><br>

        </section>

        <p><button>Contact</button></p>

      </div>
 
</template>


<style scoped>

    .textbox{
        line-height:30px;
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

      .card {
        text-align: center;
        width: 378px; 
        height: 604px; 
        margin-bottom: 20px;   
      }

      h1{
        text-align : center;
        height: 126px;
        top: 150px;
        left: 327px;
    }

    .title {
        color: rgba(56, 66, 89, 1);
        font-size: 32px;
      }

      button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 12px;
        color: white;
        background-color: rgba(247, 56, 89, 1);
        text-align: center;
        cursor: pointer;
        width: 150px;
        font-size: 18px;
        border-radius: 50px ;
      }

      button:hover, a:hover {
        opacity: 0.7;
      }

</style>