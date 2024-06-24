function getWeather() {
  const apiKey = "1e06cdfae579a95a8126c2604416f1ae";
  const city = document.getElementById("city").value;
  const msg = document.getElementById("msg");

  if (!city) {
    msg.innerHTML = "Please enter a city!";
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // fetch data from api
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching weather data, please try again.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyWeather(data.list);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching weather data, please try again.");
    });
}

function displayWeather(data) {
  const tempDiv = document.getElementById("temperature");
  const weatherIcon = document.getElementById("weatherIcon");
  const weatherDesc = document.getElementById("weatherDesc");
  const forecastHourly = document.getElementById("forecastHourly");

  // clear previous content
  tempDiv.innerHTML = "";
  weatherDesc.innerHTML = "";
  forecastHourly.innerHTML = "";

  if (data.cod === "404") {
    weatherDesc.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureDisplay = `<p>${temperature}°C</p>`;
    const weatherDisplay = `
          <p>${cityName}</p>
          <p>${desc}</p>
      `;

    tempDiv.innerHTML = temperatureDisplay;
    weatherDesc.innerHTML = weatherDisplay;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = desc;

    showImage();
  }
}

function displayHourlyWeather(hourlyData) {
  const forecastHourly = document.getElementById("forecastHourly");
  const allHour = hourlyData.slice(0, 8);

  allHour.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const hourlyItem = `
            <div class="hourlyItem">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="hourly weather icon">
                <span>${temperature}°C</span>
            </div>
        `;
    forecastHourly.innerHTML += hourlyItem;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.style.display = "block";
}
