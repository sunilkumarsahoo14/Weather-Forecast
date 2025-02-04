const apiKey = "314d925afc1e42cd9b1125410252601";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${apiKey}&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error("Weather data not found!");
        }

        const data = await response.json();
        console.log(data);  // Debugging: Check API response in console

        // Update UI with fetched data
        document.querySelector(".city").innerHTML = `${data.location.name}, ${data.location.country}`;
        document.querySelector(".temp").innerHTML = `${Math.round(data.current.temp_c)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.current.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.current.wind_kph} km/hr`;

        // Ensure consistent weather icon size
        weatherIcon.src = "https:" + data.current.condition.icon;
        weatherIcon.style.width = "120px";  // Set a fixed width
        weatherIcon.style.height = "120px"; // Set a fixed height
        weatherIcon.style.objectFit = "contain"; // Ensures proper scaling

    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "City not found!";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/hr";

        // Placeholder icon for errors
        weatherIcon.src = "weather-app-img/error.png";  
        weatherIcon.style.width = "120px";  
        weatherIcon.style.height = "120px";  
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

// Default weather check (change "Bhubaneswar" to any preferred city)
// checkWeather("Bhubaneswar");
