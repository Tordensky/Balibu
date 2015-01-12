var React = require('react');
require('./snow');
var App = require('./components/App.react');

React.renderComponent(
    <App />,
    document.getElementById('app')
);

