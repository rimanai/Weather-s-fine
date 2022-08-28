function getWeather(lat, lon) {
  let key = "1636fb578947f1db83721ae094837fc3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(goNow);

  function formatDate(datecode) {
    let date = new Date(datecode);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let mins = date.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekday = weekdays[date.getDay()];
    return `${weekday}, ${hours}:${mins}`;
  }

  function goNow(response) {
    let innertempy = document.querySelector("#temp");
    innertempy.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let innercity = document.querySelector("#city");
    innercity.innerHTML = response.data.name;
    let innercountry = document.querySelector("#country");
    innercountry.innerHTML = response.data.sys.country;
    let innersunny = document.querySelector("#sunny");
    innersunny.innerHTML = response.data.weather[0].description;
    let innerwind = document.querySelector("#wind");
    innerwind.innerHTML = `${response.data.wind.speed} km/h`;
    let innnerhumid = document.querySelector("#humid");
    innnerhumid.innerHTML = `${response.data.main.humidity}%`;
    let innerdate = document.querySelector("#date");
    innerdate.innerHTML = formatDate(response.data.dt * 1000);
    let innericon = document.querySelector("#icon");
    innericon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    );
    let innericon2 = document.querySelector("#icon2");
    innericon2.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    );
    let innericon3 = document.querySelector("#icon3");
    innericon3.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    );
  }
}

function handleSearch(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-box");
  let city = cityinput.value;
  getGEO(city);
}

function getGEO(name) {
  let key = "1636fb578947f1db83721ae094837fc3";
  let geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=2&appid=${key}`;
  axios.get(geourl).then(findLatLon);

  function findLatLon(response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    console.log(`${lat}, ${lon}`);
    getWeather(lat, lon);
  }
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSearch);
