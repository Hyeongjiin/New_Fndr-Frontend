<template>
  <section>
    <div class="firstSection">
      <p class="devwolrd-des">
        재택근무 해외이직/취업서치의 편리함<br />SolveWhatever
      </p>
    </div>
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        placeholder="Keyword or Job title"
      />
      <span class="input-group-text" id="inputGroup-sizing-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </span>
    </div>
  </section>
</template>

<style scoped>
.firstSection {
  margin-bottom: 80px;
}
.devwolrd-des {
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 2em;
  font-weight: 500;
  letter-spacing: -3px;
  color: #4e4e4e;
}
section {
  margin-top: 100px;
  margin-bottom: 100px;
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 45%;
  margin: 0 auto;
}
.form-control {
  padding: 1.5rem 2rem;
}
svg {
  width: 30px;
  height: 30px;
  color: #f73859;
}
</style>
