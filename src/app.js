function displayTemperature(response){
    console.log(response.data)
    console.log(response.data.temperature.current);
    console.log(response.data.city);
    console.log(response.data.condition.description);
    console.log(response.data.temperature.humidity);
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
}



let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
let city = "Dayton";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);