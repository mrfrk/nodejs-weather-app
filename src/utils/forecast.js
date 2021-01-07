const { cyanBright } = require('chalk')
const request = require('request')

const forecast =  (long, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ long +'&appid=55f622db5dd1e21adf1d72db5e940913&units=metric'

    request({url, json: true}, (error, response) => {

        const {day, night } = response.body.daily[0].temp

        if (error) {
            callback('Unable to connect weather service.', undefined)
        } else if (response.body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                day,
                night,
            })
        }
    })
}

module.exports = forecast