
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
    // these variables create timestamps for the start and end of the 5 day forecast
    // These are used with allDays to compare 
    console.log(allDays);
    const startDay = dayjs().add(1, 'day').startOf('day').unix();
    console.log("start day: ", startDay);
    // we need a forcast for each day between these days
    const endDay = dayjs().add(6, 'day').startOf('day').unix();
    console.log("start day: ", endDay);

    let arr = [];
    let i = 0;
    for (let i = 0; i < allDays.length; x++) {
        console.log("allDays[i].dt",allDays[i].dt);
        currentDay = allDays[i].dt;
        if (currentDay  >= startDay && currentDay < endDay) {
            console.log(`index:${i} current day:${currentDay}`);
            // grab one item per day
            // research slice method. slice can only be used on an array slice(start,end)
            //slicing the array between 1:00 and 3:00 should give us a single item from the array that we can use
            // as the 5 day forcast
            arr.push(day)
        };

        return arr;
    }

    //return array;
}


async function getWeather(lat,lon) {
    console.log("getweather callDaysed");
    const fetch_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const headers = {
        method: "GET",
        mode: "cors"
    }
    console.log(fetch_URL);
    const response = await fetch(fetch_URL);
    const data = await response.json();
    
    extractFiveDays(data.list);

    /* for (let x = 0; x < 5; x++) {
        const day = data.list[x].dt_txt;
        const temp = data.list[x].main.temp;
        //const day = data.list[x].dt_txt;
        console.log("date of dt_txt: ",day);
        console.log("date of list.main.temp: ",temp);

    } */
}

 async function test () {
    let testCity = await getLatLon('Sydney');
    console.log(testCity);
    getWeather(testCity.lat,testCity.lon);
}

test();

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

function startupSidebar (){
    refreshSidebar();
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
    const city = await getLatLon(searchTerm);
    if (city == false) {
        console.log("no city was found",searchTerm);
        $('#user-search-message p').text(`no city was found ${searchTerm}`);
        return false;
    }
    app.addSearchHistory(city.name);
    
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


