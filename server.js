var http = require('http');
var express = require('express');
var util = require('util');
var historyApiFallback = require('connect-history-api-fallback');
var request = require('request');
historyApiFallback.setLogger(console.log.bind(console));


var app = express();
app.use(express.static('dist'));
//app.use(historyApiFallback);
app.use(express.static('public'));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    next(err);
});

app.use(function (err, req, res, next) {
    util.inspect(err);
    res.status(500).send({ error: err.message });
});


var WEATHER_URL = "http://api.openweathermap.org" +
    "/data/2.5/forecast/daily?lat=60.65785&lon=8.0269&cnt=7&units=metric&mode=json&APPID=e63abeb43da0539704aa48fd21deeb6c";

app.get('/api/weather', function (req, res) {
    request(WEATHER_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.type('application/json')
                .send(body)
                .end();
        } else {
            res.status(response.statusCode)
                .send(error)
                .end();
        }
    });
});

var server = http.createServer(app);

var port = process.env.PORT || 9999;
app.listen(port);

console.log("Server running on: localhost:", port);