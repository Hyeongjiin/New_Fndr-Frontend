<template>
  <div id="top">
    <h2>{{ title1 }}</h2>
    <h1>{{ title2 }}</h1>
  </div>
  <div class="container">
    <div class="input-wrapper">
      <input
        v-model="keyword"
        type="text"
        placeholder="Keyworld or Job title"
      />
      <input v-model="nation" type="text" placeholder="nation" />
      <button @click="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["perform-search"],
  data() {
    return {
      title1: `"Work Anywhere, Live Everywhere!"`,
      title2: "Fndr.io",
      keyword: "",
      nation: "",
    };
  },
  methods: {
    search() {
      let query = {};

      // 값이 있는 경우에만 쿼리에 키워드 추가
      if (this.keyword && this.keyword.trim() !== "") {
        query.keyword = this.keyword;
      }

      // 값이 있는 경우에만 쿼리에 국가를 추가
      if (this.nation && this.nation.trim() !== "") {
        query.nation = this.nation;
      }

      this.$router.push({
        name: "search-jobs",
        query: query,
        params: { page: "1" },
      });

      // 데이터를 fetchResults
      this.$emit("perform-search", {
        keyword: this.keyword,
        nation: this.nation,
      });
    },
  },
};
</script>

<style scoped>
* {
  line-height: 180%;
}

h1 {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  font-family: "Gasoek One", sans-serif;
  color: #f73859;
}

h2 {
  text-align: center;
  letter-spacing: -1px;
  font-size: 28px;
  /* font-style: italic; */
  font-weight: bold;
  color: #4e4e4e;
}

#top {
  margin-top: 100px;
  margin-bottom: 50px;
}

.container {
  display: flex;
  margin: 0 auto;
  width: 100px;
  justify-content: center;
}

.input-wrapper {
  margin-right: 0px;
  display: flex;
  font-size: 16px;
  text-align: center;
}

input:focus {
  outline: none;
}

/* outline 테두리 없앰*/

.input-wrapper > button {
  width: 80px;
  border-radius: 10px;
  background-color: #f73859;
  border: none;
}

.input-wrapper > button > svg {
  color: #fff !important;
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
  height: 70px;
  margin-right: 10px;
}

input::placeholder {
  color: rgba(173, 173, 173, 1);
  font-size: 16px;
}

.container {
  display: flex;
  flex-direction: row;
}

.search-box {
  flex: 1;
  width: 50%;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  width: calc(50% - 10px);
  /* 카드의 가로 폭 조정 */
  margin-bottom: 20px;
  /* 다른 스타일링 속성들 */
}

.title {
  color: grey;
  font-size: 18px;
}
</style>
