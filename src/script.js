function updateForecast(response) {
  let temperatureElement = document.querySelector("#city-temperature");
  let cityElement = document.querySelector(".city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                class="forecast-icon"
                src="${response.data.condition.icon_url}"
              />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "754b84e4ec96a5481tfao024db3b3aff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateForecast);
}

function useSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  searchCity(searchInput.value);
}

function getDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "754b84e4ec96a5481tfao024db3b3aff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${getDay(day.time)}</div>
            <img class="weather-forecast-icon" src="${day.condition.icon_url}"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temp"><strong>${Math.round(
                day.temperature.maximum
              )}</strong></div>
              <div class="weather-forecast-temp">${Math.round(
                day.temperature.minimum
              )}</div>
            </div>
          </div>`;
    }
  });
  let dailyForecast = document.querySelector("#daily-forecast");
  dailyForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", useSearchInput);

searchCity("London");
