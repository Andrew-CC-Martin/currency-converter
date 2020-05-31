import { createStore, combineReducers, compose } from 'redux';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const reducers = {
    currencyData: (oldState = {}, { type }) => {
        switch (type) {
            default:
                return oldState;
        }
    }
};

const slices = combineReducers({ ...reducers });

const  composeEnhancers = isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;


const store = createStore(
    slices,
    composeEnhancers(),
);

export default store;
