const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d3804c2e39bb7ff822d4b9269169cc8b/' + latitude + ',' + longitude
    
    request({ url, json: true }, (error, {body}) => {
        var celzija = (body.currently.temperature - 32) * 5 / 9;
        result = Math.round(celzija * 100) / 100;
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + result  + ' celsius. ' + 'There is a ' + body.currently.precipProbability + '% chance of rain. And wind is currently blowing at ' + body.currently.windSpeed + ' per hour. ')
            }
    })
}

module.exports = forecast