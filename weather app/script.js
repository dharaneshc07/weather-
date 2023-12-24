const weatherContainer = document.getElementById("weather-container");

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, handleError);
    } else {
        weatherContainer.textContent = "Geolocation is not supported by this browser.";
    }
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.name;
            const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
            const weatherDescription = data.weather[0].description;

            weatherContainer.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherContainer.textContent = "Failed to retrieve weather data.";
        });
}

function handleError(error) {
    console.error("Error getting location:", error);
    weatherContainer.textContent = "Unable to determine your location.";
}

getWeather();
