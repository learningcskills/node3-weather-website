const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weather = require('./utils/geocode');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'NEO'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'NEO'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'NEO'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        console.log(req.query);
        return res.send({
            error: 'You must provide an address'
        })
    }

    weather.getLocationKey(req.query.address)
        .then(data => {
            console.log(data);
            if (!data) {
                return weather.getCurrentConditions(329260);
            }
            return weather.getCurrentConditions(data.Key);
        })
        .then(data => {
            console.log(data);
            res.send({
                location: req.query.address,
                forecast: data.WeatherText,
                Temperature: data.Temperature.Metric.Value,
                isDayTime: data.IsDayTime,
                WeatherIcon: data.WeatherIcon
            })
        })
        .catch(err => console.log(err));
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: ' 404 Not Found',
        message: 'Help Article Not found',
        name: 'NEO'
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: ' 404 Not Found',
        message: 'Page not found',
        name: 'NEO'
    })
})

app.listen(3000, "192.168.1.15", () => {
    console.log("Server started at 192.168.1.15:3000");
}); 