import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GlobalStyle from '../theme';
import { Application, Wrapper } from './styles';
import { Button } from './components/button'
import { currecyApiBase, apiKey } from '../../constants';

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [loadingCurrencies, setLoadingCurrencies] = useState(true);
    const [loadingConversion, setLoadingConversion] = useState(false);
    const [input, setInput] = useState(1);
    const [currency1, setCurrency1] = useState('AUD');
    const [currency2, setCurrency2] = useState('USD');
    const [conversionFactor, setConversionFactor] = useState(0);

    // On component mount, grab the list of currencies from API
    useEffect(() => {
        const fetchCurrencies = async () => {
            const { data: { results } } = await axios.get(`${currecyApiBase}/currencies?apiKey=${apiKey}`);

            const orderedCurrencies = Object.entries(results).sort((a, b) => {
                if (a[1].currencyName < b[1].currencyName) {
                    return -1;
                }
                if (a[1].currencyName > b[1].currencyName) {
                    return 1;
                }
                return 0;
            });

            setLoadingCurrencies(false);
            setCurrencies(orderedCurrencies);
        };

        fetchCurrencies();
    }, []);

    const handleInputChange = (e, setValue) => {
        const { currentTarget: { value } } = e;
        setConversionFactor(0);

        setValue(value);
    };

    const onClickConvert = async (e) => {
        setLoadingConversion(true);
        e.preventDefault();

        // If user clicks convert and no value is entered, just default it to 1
        if (!input) {
            setInput(1);
        }

        const { data } = await axios.get(`${currecyApiBase}/convert?q=${currency1}_${currency2}&compact=ultra&apiKey=${apiKey}`);

        setLoadingConversion(false);
        setConversionFactor(Object.entries(data)[0][1]);
    };

    const numericInput = parseFloat(input)
    const formattedInput = numericInput.toLocaleString()
    let formattedOutput
    if (conversionFactor) {
        formattedOutput = (conversionFactor * numericInput).toLocaleString()
    }

    return (
        <>
            <Application >
                <p>Currency Converter</p>

                {loadingCurrencies
                    ? <p>loading currencies...</p>
                    : (
                        <Wrapper>
                            <form onSubmit={onClickConvert}>
                                <input type="number" value={input} onChange={e => handleInputChange(e, setInput)} />

                                <select value={currency1} onChange={e => handleInputChange(e, setCurrency1)}>
                                    {currencies.map(currency => (
                                        <option value={currency[0]} key={currency[0]}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <select value={currency2} onChange={e => handleInputChange(e, setCurrency2)}>
                                    {currencies.map(currency => (
                                        <option value={currency[0]} key={currency[0]}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <Button loading={loadingConversion} />
                            </form>
                            {!!conversionFactor && (
                                // todo: pretty format converted no.
                                <p>{formattedInput} {currency1} = {formattedOutput} {currency2}</p>
                            )}
                        </Wrapper>
                    )
                }
            </Application>
            <GlobalStyle />
        </>
    );
};

export default hot(App);