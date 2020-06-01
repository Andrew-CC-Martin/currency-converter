
export const formatCurrency = (symbol, value) => `${symbol || ''}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
