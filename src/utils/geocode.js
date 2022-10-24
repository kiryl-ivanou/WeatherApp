const CONSTANTS = require("./constants");
const request = require("postman-request");

function getGeoCode(location, callback) {
    const url = `${
        CONSTANTS.mapbox.base_url
    }/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
    )}.json?access_token=${CONSTANTS.mapbox.api_key}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({
                error: "Can't fetch the geo data",
            });
            return;
        }
        if (!body.features.length) {
            callback({
                error: "No location found",
            });
            return;
        }

        const geoData = body.features[0];
        callback({
            "latitude": geoData.center[1],
            "longitude": geoData.center[0],
            "location": geoData.place_name,
        });
    });
}

module.exports = {
    getGeoCode,
};
