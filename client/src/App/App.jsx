import { hot } from 'react-hot-loader/root';
import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';

const App = () => (
    <>
        <Application >
            <p>app goes here</p>
        </Application>
        <GlobalStyle />
    </>
);

export default hot(App);