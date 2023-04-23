var userFormEl = document.querySelector('#searchBar');
var searchInputEl = document.querySelector('#search');
var weatherResultEl = document.querySelector('#weatherResult');
var forecastResultEl = document.querySelector('#forecastResult');
var SearchedCitiesEl = document.querySelector('#PrevSearch');

var today = dayjs();
var APIKey = "dd88a0b7f6fcfb38658d92feeb221ff3";

//var displaySearchedCities = function () {
//    var prevSearches = "";
//    prevSearches = localStorage.getItem('cities');
//    console.log(prevSearches);
//}

var formSubmitHandler = function (event) {
    event.preventDefault();

    let city = searchInputEl.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city);
        searchInputEl.value = '';
        //addTo(city);
    }
};

// var addTo = function(item){
//     var cities = [];
//     var storedCities = JSON.parse(localStorage.getItem("cities"));
//     if (!storedCities){
//         localStorage.setItem('cities', item);
//     }
    
//     else if (!storedCities.includes(item)){
//         storedCities.push(item);
//         localStorage.setItem('cities', JSON.stringify(cities));
//     }
// }

var getWeather = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + "&units=metric"
    fetch(apiUrl)
    .then (function(response){
        if (response.ok){
            response.json().then(function (data){
                displayWeather(data);
            });
        }
        else {
            alert("No results found");
        }
    });
};

var getForecast = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey + "&units=metric";
    fetch(apiUrl)
    .then (function(response){
        if (response.ok){
            response.json().then(function (data){
                displayForecast(data);
            });
        }
    });
};

var displayWeather = function (weather) {

    var weatherInfoEl = document.createElement('div');
    weatherInfoEl.classList = "list-item flex-row justify-space-between align-center";

    var weatherNameEl = document.createElement('span');
    weatherNameEl.textContent = weather.name + " (" + today.format('DD/MM/YYYY') + ") " + weather.weather;
    console.log(weather.name);
    console.log(weather.weather);
    weatherInfoEl.appendChild(weatherNameEl);

    var weatherTempEl = document.createElement('span');
    weatherTempEl.textContent = weather.main.temp + " °C";
    console.log(weather.main.temp);
    weatherInfoEl.appendChild(weatherTempEl);

    var weatherWindEl = document.createElement('span');
    weatherWindEl.textContent = weather.wind.speed + " km/h";
    console.log(weather.wind.speed);
    weatherInfoEl.appendChild(weatherWindEl);

    var weatherHumidityEl = document.createElement('span');
    weatherHumidityEl.textContent = weather.main.humidity + " %";
    console.log(weather.main.humidity);
    weatherInfoEl.appendChild(weatherHumidityEl);

weatherResultEl.appendChild(weatherInfoEl);
};

var displayForecast = function (forecast) {
for (i = 0; i < 5;i++){


    
console.log(forecast.list[i].main.temp);
console.log(forecast.list[i].wind.speed);
console.log(forecast.list[i].main.humidity);

//forecastResultEl.appendChild(forecastInfoEl);
}
};

// displaySearchedCities();
userFormEl.addEventListener('submit', formSubmitHandler);