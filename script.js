const API_KEY = '37352b81e88bf377901ba073d79609a1';
const URL = 'https://api.openweathermap.org/data/2.5/weather'

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        handleSearch(userInput);
    } else {
        alert('Empty input');
    }
});

function handleSearch(city) {
    fetch(`${URL}?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const cityEl = document.querySelector('.city');
        const dateEl = document.querySelector('.date');
        const tempValueEl = document.querySelector('.temp .temp-value'); // Selector for the new span
        const imgEl = document.querySelector('.left-panel .temp img'); // Corrected selector for the image

        cityEl.textContent = data.name;
        dateEl.textContent = new Date((data.dt * 1000) + (data.timezone * 1000)).toLocaleDateString();
        tempValueEl.textContent = `${Math.floor(data.main.temp - 273.15)}°`; // Update the temperature value

        if (imgEl) {
            imgEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        } else {
            console.error('Image element not found');
        }
    })
    .catch(error => {
        console.error('Error occurred', error);
    });
}

