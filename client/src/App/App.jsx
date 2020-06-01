import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GlobalStyle from '../theme';
import { Application, Wrapper } from './styles';
import { Button } from './components/button'
import { formatCurrency } from './utils'
import { currecyApiBase, apiKey } from '../../constants';

const App = () => {
    const [currencies, setCurrencies] = useState({});
    const [sortedCurrencies, setSortedCurrencies] = useState([]);
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

            // Sort currencies list here so we only need to do it once
            const sortedCurrencies = Object.entries(results).sort((a, b) => {
                if (a[1].currencyName < b[1].currencyName) {
                    return -1;
                }
                if (a[1].currencyName > b[1].currencyName) {
                    return 1;
                }
                return 0;
            });

            setLoadingCurrencies(false);
            setCurrencies(results);
            setSortedCurrencies(sortedCurrencies);
        };

        fetchCurrencies();
    }, []);

    const handleInputChange = (e, setValue) => {
        const { currentTarget: { value } } = e;
        setConversionFactor(0);

        setValue(value);
    };

    const onClickConvert = async (e) => {
        e.preventDefault();
        setLoadingConversion(true);

        // If user clicks convert and no value is entered, just default it to 1
        if (!input) {
            setInput(1);
        }

        const { data } = await axios.get(`${currecyApiBase}/convert?q=${currency1}_${currency2}&compact=ultra&apiKey=${apiKey}`);

        setLoadingConversion(false);
        setConversionFactor(Object.entries(data)[0][1]);
    };

    // Format inputs and outputs with commas and currency symbols
    const numericInput = parseFloat(input);
    let currencySymbol1, currencySymbol2
    if (sortedCurrencies.length > 0) {
        currencySymbol1 = currencies[currency1].currencySymbol
        currencySymbol2 = currencies[currency2].currencySymbol
    }
    const formattedInput = formatCurrency(currencySymbol1, numericInput)
    const formattedOutput = formatCurrency(currencySymbol2, (conversionFactor * numericInput))

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
                                    {sortedCurrencies.map(currency => (
                                        <option value={currency[0]} key={currency[0]}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <select value={currency2} onChange={e => handleInputChange(e, setCurrency2)}>
                                    {sortedCurrencies.map(currency => (
                                        <option value={currency[0]} key={currency[0]}>{currency[1].currencyName}</option>
                                    ))}
                                </select>

                                <Button loading={loadingConversion} />
                            </form>
                            {!!conversionFactor && (
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
