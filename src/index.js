let ctemp = null;

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
    ctemp = response.data.main.temp;
    innertempy.innerHTML = `${Math.round(ctemp)}°`;
    let innercity = document.querySelector("#city");
    innercity.innerHTML = response.data.name;
    let innercountry = document.querySelector("#country");
    innercountry.innerHTML = response.data.sys.country;
    let innersunny = document.querySelector("#sunny");
    innersunny.innerHTML = response.data.weather[0].description;
    let innerwind = document.querySelector("#wind");
    innerwind.innerHTML = `Wind·····${response.data.wind.speed} km/h`;
    let innnerhumid = document.querySelector("#humid");
    innnerhumid.innerHTML = `Humidity··········${response.data.main.humidity}%`;
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

    let innericon4 = document.querySelector("#icon4");
    innericon4.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    );
    let innericon5 = document.querySelector("#icon5");
    innericon5.setAttribute(
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

function go5days(lat, lon) {
  let key = "1636fb578947f1db83721ae094837fc3";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}&units=${units}`;
  axios.get(url).then(showForecast);
}

function getGEO(name) {
  let key = "1636fb578947f1db83721ae094837fc3";
  let geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${key}`;
  axios.get(geourl).then(findLatLon);

  function findLatLon(response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;

    getWeather(lat, lon);
    go5days(lat, lon);
  }
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSearch);

function handleClick(event) {
  event.preventDefault();

  if (logo.innerHTML === "C") {
    logo.innerHTML = `F`;
    let innerctemp = document.querySelector("#temp");
    let fullftemp = (ctemp * 9) / 5 + 32;
    let ftemp = Math.round(fullftemp);
    innerctemp.innerHTML = `${ftemp}°`;
  } else {
    logo.innerHTML = "C";
    let innerctemp = document.querySelector("#temp");
    innerctemp.innerHTML = `${Math.round(ctemp)}°`;
  }
}

let logo = document.querySelector("#cbutton");
logo.addEventListener("click", handleClick);

function formatDt(dtcode) {
  let date = new Date(dtcode * 1000);
  let day = date.getDate();
  let daysarray = [
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return daysarray[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let sendlat = response.data.lat;
  let sendlon = response.data.lon;
  let forecastselector = document.querySelector("#forecast");

  let forecasthtml = `<div class="row forecast">`;

  forecast.forEach(function (dayforecast, index) {
    if (index < 6) {
      forecasthtml =
        forecasthtml +
        ` <div class="col-2"><h3 class="fore-day">${formatDt(
          dayforecast.dt
        )}</h3>
        <br />
        <img src="https://openweathermap.org/img/wn/${
          dayforecast.weather[0].icon
        }@2x.png">
         <br />
        <span class="fore-max">${Math.round(
          dayforecast.temp.max
        )}°</span> / <span class="fore-min">${Math.round(
          dayforecast.temp.min
        )}°</span> C
      </div>`;
    }
  });

  forecasthtml = forecasthtml + `</div>`;

  forecastselector.innerHTML = forecasthtml;

  return sendlat, sendlon;
}
