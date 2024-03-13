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

let searchElement = document.querySelector(".search-form");

searchElement.addEventListener("submit",searchCity);
findCity("Johannesburg");