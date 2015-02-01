var React = require('react');
var App = require('./elements/App');

require('./snow');

React.renderComponent(
    <App />,
    document.getElementById('app')
);

