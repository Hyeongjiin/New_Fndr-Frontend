<template>
    <div class="container">
        <div class="button-section">
            <button @click="performSearch" class="searchbutton">search</button>
        </div>
        <div class="search-section">
            <h3>Search keyword</h3>
            <input type="text" v-model="searchKeyword" placeholder="keyworld" />
        </div>
        <div class="search-section">
            <h3>Location</h3>
            <ul class="search-form">
                <li class="continent" v-for="continent in nationsList" :key="continent.name">
                    <input type="checkbox" :value="continent.name" :id="'location-' + continent.name"
                        v-model="computedCheckedContinents[continent.name]"
                        @change="handleContinentChange(continent, $event)">
                    <label :for="'location-' + continent.name">{{ continent.name }}</label>
                    <div class="dropdownBtn" @click="toggleDropdown(continent.name)">
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                    <ul class="nation" v-if="showDropdown[continent.name]">
                        <li v-for="country in continent.countries" :key="country">
                            <input type="checkbox" :id="'country-' + country.id" :value="country.id"
                                v-model="checkedCountries[country.id + '-' + continent.name]">
                            <label :for="'country-' + country.id">{{ country.name }}</label>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="search-section">
            <ul class="search-form second">
                <li>
                    <input type="checkbox" v-model="visaSupport" value="Visa support" id="Visa">
                    <label for="Visa">Visa support</label>
                </li>
                <li>
                    <input type="checkbox" v-model="fullyRemote" value="Fully remote" id="remote">
                    <label for="remote">Fully remote</label>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        nationsList: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            showDropdown: {}, // 드롭다운 토글데이터
            clickNation: 0,
            searchKeyword: '',
            checkedContinents: {},
            checkedCountries: {},
            checkedCountryIds: [],
            visaSupport: false,
            fullyRemote: false,

        }
    },
    created() {
        this.initDropdown();
    },
    methods: {
        toggleDropdown(key) {
            this.showDropdown[key] = !this.showDropdown[key];
        },
        initDropdown() {
            for (let continent of this.nationsList) {
                this.showDropdown[continent.name] = false;
            }
        },
        performSearch() {
            const selectedNations = [];
            for (const continent of this.nationsList) {
                for (const country of continent.countries) {
                    if (this.checkedCountries[country.id + '-' + continent.name]) {
                        selectedNations.push(country.id);
                    }
                }
            }

            console.log("selectedNations:", selectedNations); // 디버깅용

            const nationIds = selectedNations;
            const queryObj = {
                nation: nationIds
            };
            if (this.searchKeyword.trim()) {
                queryObj.keyword = this.searchKeyword;
            }

            // 체크박스가 선택된 경우만 쿼리 파라미터에 추가
            if (this.visaSupport) {
                queryObj.visa = true;
            }

            if (this.fullyRemote) {
                queryObj.remote = true;
            }

            console.log("queryObj before routing:", queryObj); // 디버깅용
            this.$router.push({
                name: 'search-jobs',
                params: { page: 1 },
                query: queryObj
            });
            this.searchTerm = ''; // 인풋필드 초기화
        },
        handleContinentChange(continent, event) {
            const isChecked = event.target.checked;
            for (let country of continent.countries) {
                this.checkedCountries[country.id + '-' + continent.name] = isChecked;
            }
            this.updateContinentCheckbox(continent);
        },
        updateContinentCheckbox(continent) {
            const allChecked = continent.countries.every(country => this.checkedCountries[country.id + '-' + continent.name]);
            this.checkedContinents[continent.name] = allChecked;
        }

    },
    computed: {
        computedCheckedContinents: {
            get() {
                let result = {};
                for (let continent of this.nationsList) {
                    result[continent.name] = continent.countries.every(country => this.checkedCountries[country.id + '-' + continent.name]);
                }
                return result;
            },
            set(newValue) {
                for (let continentName in newValue) {
                    const isContinentChecked = newValue[continentName];
                    const continent = this.nationsList.find(c => c.name === continentName);
                    if (continent) {
                        for (let country of continent.countries) {
                            this.checkedCountries[country.id + '-' + continent.name] = isContinentChecked;
                        }
                    }
                }
            }
        }
    },
    watch: {
        checkedCountries: {
            handler() {
                for (let continent of this.nationsList) {
                    this.updateContinentCheckbox(continent);
                }
            },
            deep: true
        }
    }
}
</script>
    
<style scoped>
* {
    color: #4E4E4E;
}


h3 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 1rem;
}

.container {
    display: flex;
    margin-left: 0;
    margin-right: 2rem;
    width: 18rem;
    height: auto;
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    line-height: 29px;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: sticky;
    top: 50px;
}

.button {
    display: inline-block;
    justify-content: center;
}

.button-section {
    width: 100%;
    display: block;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 20px;
}

.searchbutton {
    width: 100%;
    height: 47px;
    border-radius: 50px;
    padding: 12px 0px 12px 0px;
    display: flex;
    border: 0;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #F73859;
    text-transform: uppercase;
    cursor: pointer;

}

.search-section {
    width: 100%;
    display: block;
    flex-direction: column;
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid #D9D9D9;
}

.search-section:last-child {
    padding-bottom: 0px;
    border-bottom: 0;
}

.search-section>input {

    margin-top: 1%;
    margin-bottom: 1%;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #D9D9D9;
    height: 3rem;

}

.search-section>input::placeholder {

    color: #D9D9D9;
}

.search-form {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.second>li {
    margin-bottom: 10px;
}

.continent {
    position: relative;
    margin-bottom: 10px;
    padding: 0;
}

.dropdownBtn {
    position: absolute;
    right: 0;
    top: 0px;
    display: block;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    -webkit-transition: all .175s;
    -o-transition: all .175s;
    transition: all .175s;
}

.nation {
    list-style: none;
    padding-left: 20px;
    margin: 0;
}

.nation li {
    margin: 10px;
}

.search-form>li:last-child {
    margin-bottom: 0px;
}

label {
    align-items: center;
}

.search-form input[type="checkbox"] {

    position: absolute;
    z-index: -1;
    opacity: 0;
    margin: 0;
}

.search-form input[type="checkbox"]+label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    border: 2px solid #D9D9D9;
    -webkit-border-radius: 2px;
    border-radius: 5px;
    margin-right: 9px;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: 8px 8px;
    background-size: 8px 8px;
    background-color: #fff;
}

.search-form input[type="checkbox"]:checked+label::before {
    border-color: #F73859;
    background-color: #F73859;
    background-image: url(/src/components/img/check.svg);
    background-size: cover;
}

.bi {
    color: #F73859;
}
</style>
    
