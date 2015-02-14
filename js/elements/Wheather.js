var $ = require('jquery');
var React = require("react");

function getWheater(location) {
    return $.get( "/api/weather/" + location);
}

var WheatherWidget = React.createClass({
    render: function () {
        return (
            <div className='weather-widget'>
                <img className="weather-icon" src='images/05d.svg'/>
                <div className='weather-temp'>{this.props.temp}</div>
                <div className='weather-location'>{this.props.location}</div>
            </div>
            )
    }
});


module.exports = React.createClass({
    componentWillMount: function() {
        var that = this;
        getWheater("oslo").done(function (response) {
            console.log("got data print dAAA", response);
            console.log($.parseXML(response));

            that.setState({wheatherData: "hurra"});
        });
    },

    render: function () {
        return (
            <div className='wheather-container'>
                <WheatherWidget location={'Hallingskarvet'} temp={'- 10'} />
                <WheatherWidget location={'Geilo'} temp={'- 5'} />
                <WheatherWidget location={'Ål'} temp={'- 9'} />
                <WheatherWidget location={'Oslo'} temp={'3'} />
            </div>
            )
    }
});