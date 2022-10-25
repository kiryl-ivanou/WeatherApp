import { FORECAST_CONSTANTS as forecastConstants } from "./utils/constants.js";
import Forecast from "./utils/Forecast.js";

/**
 * Listen to click event
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - the namespace and name of the event
 */
getElementById("get_weather_btn").addEventListener(
    "click",
    onGetWeatherBtnClick
);

/**
 * Listen to keyup event of Location input field
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#keyup - the namespace and name of the event
 */
getElementById("location_input").addEventListener(
    "keyup",
    onGetWeatherBtnClick
);

/**
 * Handles click on 'Get Forecast' button, fetches forecast data from BE.
 *
 * @param {object} e - Event that occurred
 * @async
 * @public
 */
async function onGetWeatherBtnClick(e) {
    if (e.type === "keyup" && e.keyCode !== 13) {
        return;
    }
    showLoadingMessage();
    const weatherData = await fetchWeatherData(getLocation());
    createForecast(weatherData);
}

/**
 * Fetches weather data by given location.
 *
 * @param {string} location - The location to fetch for
 * @public
 * @returns {Promise<object>} - Parsed weather data
 */
function fetchWeatherData(location) {
    return fetch(`/weather?address=${location}`).then((response) =>
        response.json()
    );
}

/**
 * Sets forecast description to corresponding <p> tags
 *
 * @param {object} weatherData - Weather data object.
 * @param {string} weatherData.location - Forecast location.
 * @param {string} weatherData.feelslike - Forecast feels like temperature.
 * @param {string} weatherData.temperature - Forecast temperature.
 * @param {string} weatherData.forecast - Forecast description.
 * @param {string || undefined} weatherData.error - In case of error, contains it's text.
 * @public
 */
function createForecast({ location, feelslike, temperature, forecast, error }) {
    const weatherForecast = new Forecast(getElementById("forecast_container"));

    weatherForecast.clearForecast();
    if (error) {
        weatherForecast.generateForecastBlock(
            forecastConstants.FORECAST_ERROR.TITLE,
            forecastConstants.FORECAST_ERROR.ICON,
            error,
            { class: "error" }
        );
        return;
    }

    weatherForecast.generateForecastBlock(
        forecastConstants.LOCATION.TITLE,
        forecastConstants.LOCATION.ICON,
        location
    );
    weatherForecast.generateForecastBlock(
        forecastConstants.TEMPERATURE.TITLE,
        forecastConstants.TEMPERATURE.ICON,
        temperature
    );
    weatherForecast.generateForecastBlock(
        forecastConstants.FEELS_LIKE_TEMPERATURE.TITLE,
        forecastConstants.FEELS_LIKE_TEMPERATURE.ICON,
        feelslike
    );
    weatherForecast.generateForecastBlock(
        forecastConstants.FORECAST_DESCRIPTION.TITLE,
        forecastConstants.FORECAST_DESCRIPTION.ICON,
        forecast
    );
}

/**
 * Shows forecast loading message
 *
 * @public
 */
function showLoadingMessage() {
    getElementById("forecast_container").innerHTML = "<p>Loading...</p>";
}

/**
 * Returns value of Location input field
 *
 * @public
 * @returns {string} - value of Location input field
 */
function getLocation() {
    return getElementById("location_input").value;
}

/**
 * Returns HTML element by given id
 *
 * @param {string} id - Id of an element
 * @public
 * @returns {HTMLElement} - Desired element
 */
function getElementById(id) {
    return document.querySelector(`#${id}`);
}
