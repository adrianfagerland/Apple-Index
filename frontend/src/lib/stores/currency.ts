import { writable } from 'svelte/store';

interface ExchangeRates {
  [key: string]: number;
}

export const exchangeRates = writable<ExchangeRates>({});

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    exchangeRates.set(data.rates);
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
  }
}

// Initialize exchange rates
fetchExchangeRates();