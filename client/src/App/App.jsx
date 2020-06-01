import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

import GlobalStyle from '../theme';
import { Application } from './styles';
import { currecyApiBase } from '../../constants'

const compareCurrencies = () => console.log('compare currencies');

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const result = await axios.get(`${currecyApiBase}/currencies.json`);

            setLoadingCurrencies(false)
            setCurrencies(result.data);
        };

        fetchCurrencies();
    }, []);

    console.log("App -> currencies", currencies)

    return (
        <>
            <Application >
                <p>Currency Converter</p>

                {loadingCurrencies
                    ? <p>loading currencies...</p>
                    : (
                        <form onSubmit={() => {}}>
                        {/* <form onSubmit={e => onClickConvert(e, onUpdateInput, input)}> */}
                            {/* <input type="text" value={input} onChange={handleInputChange} /> */}

                            <select name="currency1">
                                {Object.keys(currencies).map(currency => (
                                    <option value={currency} key={currency}>{currencies[currency]}</option>
                                ))}
                            </select>

                            <select name="currency2">
                                {Object.keys(currencies).map(currency => (
                                    <option value={currency} key={currency}>{currencies[currency]}</option>
                                ))}
                            </select>

                            <button onClick={compareCurrencies}>
                                Convert
                            </button>
                        </form>
                    )
                }
            </Application>
            <GlobalStyle />
        </>
    )
};

export default hot(App);