import _ from "lodash";
import React from "react";

module.exports = React.createClass({
    render: function() {
        return (
                <div id="logo-container" className="logo-beholder">
                    <canvas id="canvas"></canvas>
                    <img className="logo" src='images/balibu-logo-test.svg'/>
                </div>
            );
    }
});