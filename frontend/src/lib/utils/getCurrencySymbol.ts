import type {Country} from '../types/country';

export default function getCurrencySymbol(country: Country | undefined): string {
    if (!country?.currencies) return '';
    const currencyKey = Object.keys(country.currencies)[0];
    return country.currencies[currencyKey]?.symbol || '';
}