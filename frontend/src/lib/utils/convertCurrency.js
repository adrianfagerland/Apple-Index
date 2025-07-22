export function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    return (amount / fromRate) * toRate;
  }
  