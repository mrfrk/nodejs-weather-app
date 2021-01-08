const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { createSecretKey } = require('crypto')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')       //view engine and views is predetermined sytaxes by express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)      // registers all partials in that directory

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index',{
    title: 'Weather',
    name: 'Omer F.C.'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Omer F.C.'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Omer F.C.'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an adress!'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, place } = {}) => {
    if (error) {
        return res.send({error});
    }

    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
            return res.send({error});
        }

        res.send({
          forecast: 'Day temperature is ' +forecastData.day + 'C. Night temp is ' + forecastData.night + 'C.',
          location: place,
          address: req.query.address
        })
    })
})
    
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a "search" query.'
    })
  }
    
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Omer F.C.',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Omer F.C.',
    error: 'This is 404 page'
  })
})

app.listen(port, () => {
  console.log('Listening port ' + port +'. Web Server is live! ')})