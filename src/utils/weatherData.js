const CONSTANTS = require("./constants");
const request = require("postman-request");

function getCurrentWeatherData(geoCode, callback) {
    const url = `${CONSTANTS.weatherstack.base_url}/current?access_key=${CONSTANTS.weatherstack.api_key}&query=${geoCode}&units=m`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: "Can't fetch the weather data" });
            return;
        }
        if (body.error) {
            callback({ error: body.error.info });
            return;
        }
        callback(body.current);
    });
}

module.exports = {
    getCurrentWeatherData,
};
