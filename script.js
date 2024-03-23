
const htmlElement = document.documentElement;
const weatherLocation = document.querySelector('.weather-location');
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.weather-temperature');


navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError() {
    weatherLocation.innerText = '';
    weatherIcon.alt = "Geolocalizzazione disattivata";
    weatherIcon.src = "images/geolocation_disabled.png";


    htmlElement.className = '';
    suggestion.innerText = 'Attiva la geolocalizzazione';
}

async function onSuccess(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const API_KEY = 'e9503908e3cf3a5b7d4167dbfb9c51aa';
    const units = 'metric';
    const lang = 'it';

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    const iconCode = data.weather[0].icon;
    const description = data.weather[0].description;

    weatherLocation.innerText = data.name;
    weatherIcon.alt = description;
    weatherIcon.src = `images/${iconCode}.png`;
    weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
    suggestion.innerText = getSuggestion(iconCode);

    htmlElement.className = '';


}

function getSuggestion(iconCode) {
    const suggestion = {
        '01d': 'Ricordati la crema solare!',
        '01n': 'Buonanotte',
        '02d': 'Oggi il sole va e viene...',
        '02n': 'Attenti ai lupi mannari...',
        '03d': 'Luce perfetta per fare foto...',
        '03n': 'Dormi sereno...',
        '04d': 'Che cielo grigio :(',
        '04n': 'Non si vede nemmeno la luna!',
        '09d': 'Prendi l\'ombrello!',
        '09n': 'Copriti bene!',
        '10d': 'Prendi l\'ombrello!',
        '10n': 'Copriti bene!',
        '11d': 'Attento ai fulmini!',
        '11n': 'I lampi accendono la notte!',
        '13d': 'Esci a fare un pupazzo di neve!',
        '13n': 'Notte perfetta per stare sotto il piumone!',
        '50d': 'Accendi i fendinebbia!',
        '50n': 'Guida con prudenza!',
    }

    return suggestion[iconCode];
}