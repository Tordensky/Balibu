import _ from "lodash";
import React from "react";

import Logo from './Logo.js';
import Wheather from './Wheather.js';

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