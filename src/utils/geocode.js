const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2VuYXpuIiwiYSI6ImNrY2NlMXZkajAzc3cyeXIwbDNlNTVubWIifQ.3KzVVHTVgXogdw2YtOKyvQ&limit=1`;

    request.get({ uri: url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location service!');
        } else if (body.features.length === 0) {
            callback('Location not found. Please try again.');
        } else {
            const [longitude, latitude] = body.features[0].center;

            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;