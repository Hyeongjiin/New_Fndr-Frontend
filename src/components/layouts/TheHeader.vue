<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <span class="navbar-brand"><router-link to="/">Fndr.io</router-link></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Search jobs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link to="/detail">Review</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Community</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Gasoek+One&display=swap");

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
  color: #F73859;
}

.navbar-brand>a {
  text-decoration: none;
  font-family: 'Gasoek One', sans-serif;
  color: #F73859;
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