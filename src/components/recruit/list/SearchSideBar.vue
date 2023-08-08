<template>
    <div class="container">
        <div class="button-section">
            <button class="searchbutton">search</button>
        </div>
        <div class="search-section">
            <h3>Search keyword</h3>
            <input type="text" placeholder="keyworld" />
        </div>
        <div class="search-section">
            <h3>Location</h3>
            <ul class="search-form">
                <li><input type="checkbox" value="North America" id="location-NA"><label for="location-NA">North
                        America</label></li>
                <li><input type="checkbox" value="Europe" id="location-E"><label for="location-E">Europe</label></li>
                <li><input type="checkbox" value="Asia" id="location-A"><label for="location-A">Asia</label></li>
                <li><input type="checkbox" value="Oceania" id="location-O"><label for="location-O">Oceania</label></li>
            </ul>
        </div>
        <div class="search-section">
            <ul class="search-form">
                <li><input type="checkbox" value="Visa support" id="Visa"><label for="Visa">Visa support</label></li>
                <li><input type="checkbox" value="Fully remote" id="remote"><label for="remote">Fully remote</label></li>
            </ul>
        </div>
    </div>
</template>

<!-- data fetch해온거 props로 뿌린뒤에 여기에 checkbox에 연결 -->
    
<style scoped>
* {
    color:#4E4E4E;
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

.search-form > li {
    margin-bottom: 10px;
}

.search-form > li:last-child {
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
</style>
    
