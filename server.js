var http = require('http');
var express = require('express');
var util = require('util');
var historyApiFallback = require('connect-history-api-fallback');
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


app.get('/api/weather/:city', function (req, res) {
    var city = req.param('city');

    console.log("Got request for wheateher in: ", city);

    var options = {
        host: "www.yr.no",
        port: 80,
        path: '/sted/Norge/Telemark/Sauherad/Gvarv/varsel.xml',
        type: 'text/xml',
        method: 'GET'
    };

    http.request(options, function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        var data = "";
        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            res
                .type('text/xml')
                .send(data)
                .end();
        });
    }).end();
});

var server = http.createServer(app);

var port = process.env.PORT || 9999;
app.listen(port);
console.log("Server running on: localhost:", port);