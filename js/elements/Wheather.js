var $ = require('jquery');
var React = require("react");
var momement = require('moment');

// BALIBU LOCATION 60.6523156, 8.0265064,2137

function getWheater(location) {
    return $.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=60.6523156&lon=8.0265064&units=metric");
}

var WheatherWidget = React.createClass({
    DAYS: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    render: function () {
        var dayName = this.DAYS[momement(this.props.data.dt*1000).weekday()];
        var icon = this.props.data.weather[0].icon;
        return (
            <div className='weather-widget'>
                <img className="weather-icon" src={'http://openweathermap.org/img/w/'+icon+'.png'}/>
                <div className='weather-temp'>{Math.round(this.props.data.temp.day, 2)}</div>
                <div className='weather-location'>{dayName}</div>
            </div>
            )
    }
});


module.exports = React.createClass({
    getInitialState: function () {
        return {wheatherData: null};
    },

    componentWillMount: function() {
        var that = this;
        getWheater("oslo").done(function (wheatherData) {
            console.log("got data", wheatherData);
            that.setState({wheatherData: wheatherData});
        });
    },

    render: function () {
        var wheatherWidgets;
        if (this.state.wheatherData) {
            wheatherWidgets = this.state.wheatherData.list.map(function (data, index) {
                return (<WheatherWidget key={index} data={data} />);
            });
        }

        return (
            <div className='wheather-container'>
                {wheatherWidgets}
            </div>
            )
    }
});