

const apiKey = "0a2e788fd2a244aba1e44617261101"; // your WeatherAPI key

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city === "") {
        weatherResult.innerHTML = "Please enter a city name!";
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                weatherResult.innerHTML = data.error.message;
                return;
            }

            const { temp_c, condition, humidity, wind_kph } = data.current;
            const cityName = data.location.name;
            const country = data.location.country;

            weatherResult.innerHTML = `
                <h2>${cityName}, ${country}</h2>
                <p><strong>Temperature:</strong> ${temp_c}°C</p>
                <p><strong>Condition:</strong> ${condition.text}</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind:</strong> ${wind_kph} kph</p>
            `;
        })
        .catch(error => {
            console.error(error);
            weatherResult.innerHTML = "Something went wrong. Please try again.";
        });
});
