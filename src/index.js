let key = "1636fb578947f1db83721ae094837fc3";
let lat = -37;
let lon = 144;
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

function goNow(response) {
  console.log(response.data);
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
  console.log(response.data.wind.speed);
  let innnerhumid = document.querySelector("#humid");
  innnerhumid.innerHTML = `${response.data.main.humidity}%`;
}

axios.get(url).then(goNow);
