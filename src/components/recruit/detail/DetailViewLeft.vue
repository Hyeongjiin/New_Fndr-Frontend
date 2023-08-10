<template>
  <div class="card">

    <h1 class="title"> {{ jobDetail.description_title }} </h1> 

    <div class="stackbox">
      <div class="stack">Java</div>
      <div class="stack">Python</div>
      <div class="stack">c++</div>
      <div class="stack">C#</div>
    </div>

    <hr style="margin-top: 0; ">

    <section>
      <span>about company</span>
      <br>
      <br>
      <div class="companyinformantion">
        We provide a simple and clear payment API, which enables webshop and app builders to implement more than ten
        different payment methods in one go.In the first
        few years of existence, Mollie was a developer-only adventure and about 15 years later devs and techs still
        comprise roughly 30% of all staff.
        As a natural consequence, Mollie still is—and aims to remain—highly tech-minded. We take a developers-first
        approach to our products and internal
        development strategy, something that both our customers and our developers appreciate.
      </div>
      <br>
      <br>
    </section>


    <section>
      <span>about company</span>
      <br>
      <br>
      <div class="companyinformantion">
        We provide a simple and clear payment API, which enables webshop and app builders to implement more than ten
        different payment methods in one go.In the first
        few years of existence, Mollie was a developer-only adventure and about 15 years later devs and techs still
        comprise roughly 30% of all staff.
        As a natural consequence, Mollie still is—and aims to remain—highly tech-minded. We take a developers-first
        approach to our products and internal
        development strategy, something that both our customers and our developers appreciate.
      </div>
      <br>
      <br>
    </section>



      <section>
        <span>about company</span>
        <br>
        <br>
        <div class="companyinformantion">
          We provide a simple and clear payment API, which enables webshop and app builders to implement more than ten
          different payment methods in one go.In the first
          few years of existence, Mollie was a developer-only adventure and about 15 years later devs and techs still
          comprise roughly 30% of all staff.
          As a natural consequence, Mollie still is—and aims to remain—highly tech-minded. We take a developers-first
          approach to our products and internal
          development strategy, something that both our customers and our developers appreciate.
        </div>
        <br>
        <br>
      </section>

  </div>
</template>

<script>
export default {
  props: ['jobDetail'],
}
</script>

<style scoped>
.companyinformantion {
  padding: 10px;
  background-color: rgba(242, 246, 248, 1);
  border-radius: 30px;
}

.card {
  width: 500px;
  height: atuo;
  margin-bottom: 0;
 
  padding: 10px;
  border-color: rgba(217, 217, 217, 1);
}

.box {
  width: 100px;
  height: auto;
  margin-right: 3ch;
  margin-left: 1ch;
  background-color: rgba(242, 246, 248, 1);
  border-color: rgba(56, 66, 89, 1);
  border-radius: 30px;
  line-height: 200px;
}

.stackbox{
  margin-bottom:15px;
}

.stack {
  display: inline-block;
  background-color: rgba(242, 246, 248, 1);
  border-radius: 10px;
  color: rgba(247, 56, 89, 1);
  margin-right: 5px;
  padding-top: 4px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 4px;
}

.title {
  color: rgba(56, 66, 89, 1);
  font-size: 50px;
}
</style>
      
