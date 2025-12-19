const apiKey = 'c63c0955dcc620b086dcfb84766f83dc'; 
const btn = document.getElementById('getWeather');
const resultDiv = document.getElementById('weatherResult');

btn.addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        resultDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    resultDiv.innerHTML = "Loading...";

    try {
       
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        
        const data = await response.json();

        if (!response.ok) {
          
            throw new Error(data.message || "Something went wrong.");
        }

        resultDiv.innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});