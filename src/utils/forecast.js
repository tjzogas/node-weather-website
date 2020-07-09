const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f16c9c83dc962fb3d7e0add5dd6281e8&query=${latitude},${longitude}&units=f`;

    request.get({ uri: url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${
                body.current.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;