
const API_KEY = "8f85338984e3df53ec6b4d1b08f1d3a3";
const LIMIT = 10;
const HISTORY_LENGTH = 4;

//localStorage
let appData = JSON.parse(localStorage.getItem('app'));
if (!appData) appData = {
    searchHistory: [],
};

let app = {
    data: appData,
    addSearchHistory: function (term) {
        if (!this.data.searchHistory.includes(term)) {    
            this.data.searchHistory.unshift(term);
        }
    localStorage.setItem('app',JSON.stringify(appData));
    refreshApp();
}
}

//Calls to API
async function getWeather(lat,long) {
    const fetch_URL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const headers = {
        method: "GET",
        mode: "cors"
    }
    const response = await fetch(URL,headers);
    const json = await response.json();
    console.log(json);
}

async function getLatLong(cityName) {
    const fetch_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${LIMIT}&appid=${API_KEY}`;
    
    const response = await fetch(fetch_URL)
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    return {
        name:data[0].name,
        lat:data[0].lat,
        long: data[0].long
    }
}
    console.log("response status:",response.status);
    return false;
}


console.log(getLatLong('New York'));
console.log(getLatLong('Jakarta'));
console.log(getLatLong('Sydney'));
console.log(getLatLong('Aukland'));



//SIDEBAR JQERY ITEMS
const $searchInput = $('#search-input');
const $searchButton = $('#search-button');
const $cityList = $('#city-history-list');
let searchHistory = 

//Sidebar Event Listeners
$searchButton.on('click', function (event) {
    handleSearchClick();
    event.preventDefault();
}
);
$searchInput.on('input',function (event) {
    const searchPredict = $searchInput.val();
    console.log("can predict: ", searchPredict);
});

//Sidebar functions
startupApp();

function startupApp (){
    refreshApp();
}

function refreshApp (){
    $cityList.empty();
    let index = 0;
    for (city of appData.searchHistory) {
        if (index > HISTORY_LENGTH) break;
        const $cityButton = $(`<button class="button block is-normal is-info is-fullwidth">${city}</button>`);
        $cityButton.on('click',()=>{
            $searchInput.val(city);
            handleSearchClick();
        })
        $cityList.append($cityButton);
        index ++
    }
}

async function handleSearchClick(event) {
    const searchTerm = $searchInput.val();
    app.addSearchHistory(searchTerm);
    const city = await getLatLong(searchTerm);
    if (!city) {
        console.log("no city was found",searchTerm);
        $('#user-search-message p').text(`no city was found ${searchTerm}`);
        return false;
    }
    $('#user-search-message p').text(`Searching for ${searchTerm}...`)
}


//MAIN CONTENT JQUERY ITEMS
const $cityInformation = $('city-information-container');


//MAIN CONTENT FUNCTIONS

function generateCityCard (cityInfo) {
    
}

const cityResult = {
    name: "Atlanta",
    currentWeather : {
        temp: "",
        wind: "",
        humidity: "",
    },
    foreCast : [],
    display : function () {
        return `
        <div class="content container">
            <div class="card">
                <div class="card-header">
                <h2 class="card-header-title">${this.name}</h2>
                </div>
                <div class="card-content">
                    <p>Information about atlanta</p>
                    <p>Information about atlanta</p>
                    <p>Information about atlanta</p>
            </div>
        </div>
        `
    }
}


