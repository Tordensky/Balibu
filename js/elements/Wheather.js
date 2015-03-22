var $ = require('jquery');
var React = require("react");
var momement = require('moment');

// BALIBU LOCATION 60.6523156, 8.0265064,2137

function getWheater(location) {
    return $.get("/api/weather");
    //return $.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=60.6523156&lon=8.0265064&units=metric&APPID=e63abeb43da0539704aa48fd21deeb6c");
}


var exampleData = {"dt": 1427454000,
    "temp": {"day": -4.01,
        "min": -8.11,
        "max": -4.01,
        "night": -7.19,
        "eve": -5.67,
        "morn": -8.11},
    "pressure": 888.71,
    "humidity": 0,
    "weather": [
        {"id": 601,
            "main": "Snow",
            "description": "snow",
            "icon": "13d"}
    ],
    "speed": 1.71,
    "deg": 82,
    "clouds": 91,
    "snow": 5.34
};

var WindData = React.createClass({
    render: function () {
        return (
            <div className="wind-container">
                <div className="wind-direction">{this.props.deg}</div>
                <div className="wind-speed">{this.props.speed} m/s</div>
            </div>
            );
    }
});

var Temperature = React.createClass({
    render: function () {
        return (
            <div className="temperature-container">
                <div className="temperature-value">{Math.round(this.props.temp)}</div>
                <div className="temperature-title">{this.props.title}</div>
            </div>
            );
    }
});

var TemperatureData = React.createClass({
    render: function () {
        return (
            <div className="temperature-data">
                <div className="row">
                    <div className="col-lg-6">
                        <Temperature title="00:00 - 06:00" temp={this.props.data.night}/>
                    </div>
                    <div className="col-lg-6">
                        <Temperature title="06:00 - 12:00" temp={this.props.data.morn}/>
                    </div>
                    <div className="col-lg-6">
                        <Temperature title="12:00 - 18:00" temp={this.props.data.day}/>
                    </div>
                    <div className="col-lg-6">
                        <Temperature title="18:00 - 00:00" temp={this.props.data.eve}/>
                    </div>
                </div>
            </div>
            );
    }
});

var WeatherWidget = React.createClass({
    DAYS: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    NEAR: ["I dag", "I morgen"],
    render: function () {
        var dayName = this.props.index > 1 ? this.DAYS[momement(this.props.data.dt * 1000).weekday()] : this.NEAR[this.props.index];
        var icon = this.props.data.weather[0].icon;

        var snow = this.props.data.snow ? (
            <div className="snow-container">
                <div className="snow-crystal"><img src='images/crystal.png'/></div>
                <div className="snow-value">Snø: {this.props.data.snow} mm</div>
            </div>) : null;

        return (
            <div className='weather-widget'>
                <div className="row">

                    <div className="col-lg-6">
                        <img className="weather-icon" src={'weather/' + icon.substr(0, 3) + '.png'}/>
                    </div>
                    <div className="col-lg-6">
                        <div className='weather-location'>{dayName}</div>
                        <div className='weather-date'>{momement(this.props.data.dt * 1000).format('DD.MM.YY')}</div>
                        <div className="big-temperature">{Math.round(this.props.data.temp.day, 2)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <WindData speed={this.props.data.speed} deg={this.props.data.deg}/>
                    </div>
                    <div className="col-lg-6">
                        {snow}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <TemperatureData data={this.props.data.temp}/>
                    </div>
                </div>
            </div>
            )
    }
});


module.exports = React.createClass({
    getInitialState: function () {
        return {weatherData: null};
    },

    componentWillMount: function () {
        var that = this;
        getWheater("oslo").done(function (weatherData) {
            console.log("got data", weatherData);
            that.setState({weatherData: weatherData});
        });
    },

    render: function () {
        var weatherWidgets;
        if (this.state.weatherData) {
            weatherWidgets = this.state.weatherData.list.map(function (data, index) {
                return (<WeatherWidget key={index} index={index} data={data} />);
            });
        }

        return (
            <div className='weather-container'>
                {weatherWidgets}
            </div>
            )
    }
});