import { writable } from 'svelte/store';
import type { Country } from '$lib/types/country';
import vatRatesData from '$lib/data/vat-rates.json'; // Import the JSON file

interface VatRates {
	[key: string]: number | null;
}

const vatRatesDataTyped: VatRates = vatRatesData;
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,currencies,flag,altSpellings';

interface RestCountry {
	name: { common: string };
	cca2: string;
	currencies: { [key: string]: { name: string; symbol: string } };
	flag: string;
	altSpellings?: string[];
}

export const countries = writable<Country[]>([]);

async function loadCountries() {
	const response = await fetch(API_URL);
	const data = (await response.json()) as RestCountry[];

	const allCountries = data
		.map((item) => ({
			name: item.name.common,
			cca2: item.cca2,
			currencies: item.currencies,
			flag: item.flag,
			altSpellings: item.altSpellings || [],
			vat_rate: vatRatesDataTyped[item.cca2] || null // Add vat_rate from the JSON data
		}))
		.sort((a: Country, b: Country) => a.name.localeCompare(b.name));

	countries.set(allCountries);
}

loadCountries();
