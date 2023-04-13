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


function displayTemperature(response){
    // console.log(response.data)
    // Selecting ID temperature in HTML and giving variable name of temperatureElement
    let temperatureElement = document.querySelector("#temperature");
    // Taking the temperatureElement and replacing content w/in HTML w/ the current temp
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
let city = "Dayton";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
// console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);