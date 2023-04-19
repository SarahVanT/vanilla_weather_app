function formatDate(timestamp){
    // calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // Finding days 
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  
    let forecastHTML = `<div class="row">`;
    // For loop, argument of function is day
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
        `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

function getForcast(coordinates){
    console.log(coordinates);
    let apiKey = "62bc298785543e137bc6756e514eb1c3";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(displayForecast)
}


function displayTemperature(response){
    // console.log(response.data)
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    

    fahrenheitTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute(
        "src",
        response.data.condition.icon_url
      );
    iconElement.setAttribute("alt", response.data.condition.description);  

    getForcast(response.data.coordinates);
}

function search(city){
    let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}

// Selecting city from search
function handleSubmit(event){
    // doesn't reload page
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    // Taking value from search and pushing it to Search function
    search(cityInputElement.value)
    console.log(cityInputElement.value);
}

function calculateCelsiusTemp(event){
    event.preventDefault();
    // Selecting the temperature and save it as a temperatureElement variable
    let temperatureElement = document.querySelector("#temperature");
    let celsiusTemperature = (fahrenheitTemperature-32)*5/9;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    // putting calculated temperature back into id named temperature
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function calculateFahrenheitTemp(event){
    event.preventDefault();
    // Selecting the temperature and save it as a temperatureElement variable
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", calculateCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", calculateFahrenheitTemp);

search("Dayton");
