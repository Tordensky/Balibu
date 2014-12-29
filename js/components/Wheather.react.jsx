var React = require("react");

var WheatherWidget = React.createClass({
    render: function () {
        return (
            <div className='weather-widget'>
                <img className="weather-icon" src='images/test.png'/>
                <div className='weather-temp'>{this.props.temp}</div>
                <div className='weather-location'>{this.props.location}</div>
            </div>
            )
    }
});


module.exports = React.createClass({
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