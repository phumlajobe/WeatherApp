function formatDate(date){

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let time = `${hour}:${minutes}`

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let day = days[date.getDay()];
    return `${day} ${time}`;
}

function findTemperature(response){

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let temperatureElement = document.querySelector("#temparature-value");
    let temparature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temparature);
    
    let tempIcon = document.querySelector(".icon");
    let iconUrl = response.data.condition.icon_url;
    tempIcon.innerHTML = `<img src="${iconUrl}" 
    alt="Temperature Icon" id="temparature-icon">`

    let date = new Date(response.data.time * 1000);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(date);
    

    let humidityElement = document.querySelector("#humidity");
    let windElemnt = document.querySelector("#wind");
    let skyElement = document.querySelector("#sky");
    let wind = Math.round(response.data.temperature.humidity);
    humidityElement.innerHTML = `${wind}%`;
    let speed = Math.round(response.data.wind.speed);
    windElemnt.innerHTML = `${speed}km/h`;
    skyElement.innerHTML = response.data.condition.description;

    getForecast(response.data.city);

}


function findCity(city){

    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(findTemperature);
}


function searchCity(event){
    event.preventDefault();
    let searchElement = document.querySelector(".city-input");
    findCity(searchElement.value);
}


function getForecast(city){
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timeStamp){
    let date = new Date(timeStamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    return days[date.getDay()];
}

function displayForecast(response){
    console.log(response.data);

    let forecast= "";
    
    response.data.daily.forEach(function(day, index){

        if(index < 5){
            let tempMin = Math.round(day.temperature.minimum);
            let tempMax = Math.round(day.temperature.maximum);
            let iconUrl = day.condition.icon_url;

            forecast += `
            <div class="forecast-day">
                <div class="focast-date">
                    ${formatDay(day.time)}
                </div>
                <!--  -->
                <img src="${iconUrl}" alt="Temperature-icon" class="temparature-icon">
                <div class="focast-temp">
                    <span class="focast-max-temp">${tempMax}°</span>/ 
                    <span class="focast-min-temp">${tempMin}°</span>
                </div>
            </div>
        `;
        }
    });

    let forecastElement = document.querySelector(".temperature-focast-container");
    forecastElement.innerHTML = forecast;
}

let searchElement = document.querySelector(".search-form");

searchElement.addEventListener("submit",searchCity);
findCity("Johannesburg");

