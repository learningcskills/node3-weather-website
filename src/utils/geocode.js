const axios = require('axios');
const api = 'I3GzA7AWFUwKnfiuDYBFdZ0rVTZQOWOV';
const locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api}&q=`
const city = 'manchester'

const conditionsURL = 'http://dataservice.accuweather.com/currentconditions/v1/'

// GET request for remote image in node.js
async function getLocationKey(city) {

    let res = await axios.get(locationURL + city);
    // let key = await res.data[0].Key ;
    // console.log(res.data[0].EnglishName, res.data[0].Country.EnglishName,
    //     res.data[0].Key);
    return res.data[0];
}

// getLocationKey(city);
// console.log("Lets check this");

async function getCurrentConditions(locationKey) {
    const URL = `${conditionsURL}${locationKey}/?apikey=${api}`;
    let res = await axios.get(URL)
    // console.log(res.data[0].WeatherText,
    //     res.data[0].WeatherIcon,
    //     res.data[0].IsDayTime,
    //     res.data[0].Temperature.Metric.Value
    // );
    return res.data[0];
}

// getCurrentConditions(329260);

module.exports = { getLocationKey, getCurrentConditions }



