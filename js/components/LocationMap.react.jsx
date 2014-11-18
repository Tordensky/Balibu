var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;


function handleClick(event) {
    console.log(event, "click");
}

module.exports = React.createClass({
    render: function() {
        return (

            <Map className="locationMap"
            width={500}
            height={500}
            initialZoom={10}

            mapTypeId="terrain"

            initialCenter={new GoogleMapsAPI.LatLng(60.652954, 8.030353)}>

                <Marker
                onClick={handleClick}
                position={new GoogleMapsAPI.LatLng(60.652954, 8.030353)}/>
            </Map>
            );
    }
});