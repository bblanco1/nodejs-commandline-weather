var https = require('https');

function printCurrentWeatherForecast(location, temperature, summary) {
  var message = 'The current weather for ' + location + ' is ' + temperature + ' and ' + summary;
  console.log(message);
}

function printError(error){
    console.error(error.message);
}

function weatherForecast(location, latitude, longitude) {
  //API https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
  var forecastAPI = "https://api.forecast.io/forecast/a192f5631a3c9e68fe7cf15fa1659868/" + latitude + "," + longitude;
  var forecastRequest = https.get(forecastAPI, function(response) {
    var body = "";
    response.on('data', function (chunk){
      body += chunk;
    });
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
          var forcast = JSON.parse(body);
          printCurrentWeatherForecast(location, forcast.currently.temperature, forcast.currently.summary);

        } catch (err) {
          printError(err);
        }
      }
    })
  });
}

function getCoordsFromPostalCode(postalCode) {
  //API api.zippopotam.us/country/postal-code
  var request = https.get("https://api.zippopotam.us/us/" + postalCode, function(response) {
    var body = "";
    response.on('data', function (chunk){
      body += chunk;
    });
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
          var location = JSON.parse(body);
          weatherForecast(location.places[0]['place name'],location.places[0].latitude, location.places[0].longitude);
        } catch (err) {
          printError(err);
        }
      }
    })
  });
}

module.exports.get = getCoordsFromPostalCode;
