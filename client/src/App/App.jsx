import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GlobalStyle from '../theme';
import { Application } from './styles';
import { currecyApiBase } from '../../constants';

// note - I wouldn't normally put this into the code base, but it's needed to run the demo,
// plus it's only for a free service so no real risk here
const apiKey = 'c317eec24b56ebb0c145';

const App = () => {
    const [currencies, setCurrencies] = useState({});
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const [input, setInput] = useState(0);
    const [currency1, setCurrency1] = useState('AUD');
    const [currency2, setCurrency2] = useState('USD');
    const [conversionFactor, setConversionFactor] = useState(0);

    const handleInputChange = (e, setInput) => {
        const { currentTarget: { value } } = e;
        setConversionFactor(0);

        setInput(value);
    };

    useEffect(() => {
        const fetchCurrencies = async () => {
            const { data: { results } } = await axios.get(`${currecyApiBase}/currencies?apiKey=${apiKey}`);

            setLoadingCurrencies(false);
            setCurrencies(results);
        };

        fetchCurrencies();
    }, []);

    const onClickConvert = async (e) => {
        e.preventDefault();

        const { data } = await axios.get(`${currecyApiBase}/convert?q=${currency1}_${currency2}&compact=ultra&apiKey=${apiKey}`);

        setConversionFactor(Object.entries(data)[0][1]);
    };

    return (
        <>
            <Application >
                <p>Currency Converter</p>

                {loadingCurrencies
                    ? <p>loading currencies...</p>
                    : (
                        <>
                            <form onSubmit={onClickConvert}>
                                <input type="number" value={input} onChange={e => handleInputChange(e, setInput)} />

                                <select value={currency1} onChange={e => handleInputChange(e, setCurrency1)}>
                                    {Object.entries(currencies).map(currency => (
                                        <option value={currency[1].id} key={currency[1].id}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <select value={currency2} onChange={e => handleInputChange(e, setCurrency2)}>
                                    {Object.entries(currencies).map(currency => (
                                        <option value={currency[1].id} key={currency[1].id}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <button>
                                    Convert
                                </button>
                            </form>
                            {!!conversionFactor && (
                                <p>{input} {currency1} = {conversionFactor * input} {currency2}</p>
                            )}
                        </>
                    )
                }
            </Application>
            <GlobalStyle />
        </>
    )
};

export default hot(App);