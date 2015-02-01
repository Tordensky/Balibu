var _ = require("lodash");
var React = require("react");

var Logo = require('./Logo.js');
var Wheather = require('./Wheather.js');

module.exports = React.createClass({
    render: function() {
        return (
                <div className='app'>
                    <header>
                        <Logo />
                    </header>
                    <div className='side-innhold'>
                        <Wheather />
                    </div>
                </div>
            );
    }
});