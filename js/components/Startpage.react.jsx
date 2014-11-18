var _ = require("lodash");
var React = require("react");

var Logo = require('./Logo.react');
var LocationMap = require('./LocationMap.react');

module.exports = React.createClass({
    render: function() {
        return (
                <div>
                    <Logo />
                    <LocationMap />
                </div>
            );
    }
});