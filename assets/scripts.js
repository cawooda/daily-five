
const API_KEY = "8f85338984e3df53ec6b4d1b08f1d3a3";
const LIMIT = 10;
const HISTORY_LENGTH = 4;

//localStorage

let appData = JSON.parse(localStorage.getItem('app'));
if (!appData) appData = {
    searchHistory: [],
};

//this variable stores information about the app state
let app = {
    data: appData,
    addSearchHistory: function (term) {
        if (!this.data.searchHistory.includes(term)) {    
            this.data.searchHistory.unshift(term);
        }
    localStorage.setItem('app',JSON.stringify(appData));
    refreshSidebar();
}
}

//CallDayss to API

function extractFiveDays(allDays) {
    // this takes all forcast data and extracts a time on each day
    let returnArray = [];
    //looops through all days and returns a single time at 3. this results in a 5 object array being returned.
    for (currentDay of allDays) {
     
        if (dayjs(currentDay.dt_txt).hour() === 3) {
            returnArray.push(currentDay);
        }
    }
        return returnArray;
    }

//ASYNC FUNCTIONS and API CALLS
async function getWeather(lat,lon) {
    //get the forcast and turn it into an 5 object array for use in the forecast display.
    const latLong = await getLatLon(city);
    
    const fetch_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latLong.lat}&lon=${latLong.lon}&appid=${API_KEY}`;
    const headers = {
        method: "GET",
        mode: "cors"
    }
    console.log(fetch_URL);
    const response = await fetch(fetch_URL);
    const data = await response.json();
    
    const forecastDays = extractFiveDays(data.list);
    return forecastDays;
}

async function getLatLon(cityName) {
    const fetch_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${LIMIT}&appid=${API_KEY}`;
    
    const response = await fetch(fetch_URL)
    if (response.ok) {
        const data = await response.json();
    return {
        name:data[0].name,
        lat:data[0].lat,
        lon: data[0].lon
    }
    }
    console.log("response status:",response.status);
    return false;
}

//MAINCONTENT JQUERY ITEMS
const $cityForeCastContainer = $('forecast-information-container');
const $cityForecastCards = $cityForeCastContainer.find('.card');
console.log($cityForecastCards);

//MAIN CONTENT EVENT LISTENERS

//MAIN CONTENT FUNCTIONS

async function startupMainContent () {
    const lastSearch = appData.searchHistory[0];
    if (lastSearch) {
    const forecast = await getWeather(lastSearch)
    console.log("forecast",forecast);
    refreshMainContent(forecast);
    }
}

function refreshMainContent (forecast) {
    
}


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
startupSidebar();

async function startupSidebar (){
    await refreshSidebar();
    startupMainContent();
}

function refreshSidebar (){
    $cityList.empty();
    let index = 0;
    for (city of appData.searchHistory) {
        if (index > HISTORY_LENGTH) break;
        const $cityButton = $(`<button data-city="${city}"class="button block is-normal is-info is-fullwidth">${city}</button>`);
        $cityButton.on('click',(e)=>{
            console.log($(e.target).data('city'));
            $searchInput.val($(e.target).data('city'));
            handleSearchClick();
        })
        $cityList.append($cityButton);
        index ++
    }
}

async function handleSearchClick(event) {
    const searchTerm = $searchInput.val();
    const forecast = await getWeather(searchTerm);
    if (forecast == false) {
        console.log("no city was found",searchTerm);
        $('#user-search-message p').text(`no city was found ${searchTerm}`);
        return false;
    }
    app.addSearchHistory(city.name);
    refreshMainContent(forecast);
}


//MAIN CONTENT JQUERY ITEMS
const $cityInformation = $('#city-information-container');


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


