const request = require('request')


const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibXJmcmsiLCJhIjoiY2tqMzlvOXE3MG9wMDJ5c2I5aG95d254eSJ9.2VbyDBjnlBobknreC9qpLg&limit=1'

    request ({ url, json: true}, (error, {body}) => {

        // const {place_name:place, center[1]:latitude, center[0]:longitude } = response.body.features[0]

        if (error) {
            callback('Unable to connect geocoding service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }
    })
}


module.exports = geocode