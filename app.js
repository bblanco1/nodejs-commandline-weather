var forecast = require('./forecast');
var postalCode = process.argv.slice(2);
forecast.get(postalCode);
