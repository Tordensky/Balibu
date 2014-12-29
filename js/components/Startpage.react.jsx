var _ = require("lodash");
var React = require("react");

var Logo = require('./Logo.react');
var LocationMap = require('./LocationMap.react');
var Wheather = require('./Wheather.react');

module.exports = React.createClass({
    render: function() {
        return (
                <div className='app'>
                    <Logo />
                    <div className='side-innhold'>
                    <Wheather />
                    </div>
                </div>
            );
    }
});