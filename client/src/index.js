import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = Component => {
    ReactDOM.render(
        <Component />
        , document.getElementById('react'));
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
};
