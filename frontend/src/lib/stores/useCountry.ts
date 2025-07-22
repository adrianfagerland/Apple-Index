import { writable, type Writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { countries } from './countries';

const STORAGE_KEY = 'selected-country';

interface CountryStore {
	subscribe: Writable<string>['subscribe'];
	set: (value: string) => void;
	error: Writable<string | null>;
	isLoading: Writable<boolean>;
	detectCountry: () => Promise<void>;
}

function createCountryStore(): CountryStore {
	const storedCountry = browser ? window.localStorage.getItem(STORAGE_KEY) || '' : '';
	const { subscribe, set: innerSet } = writable(storedCountry);
	const error = writable<string | null>(null);
	const isLoading = writable(false);

	if (browser && !storedCountry) {
		// Subscribe to countries store
		const unsubscribe = countries.subscribe((availableCountries) => {
			// Only detect country once countries are loaded
			if (availableCountries.length > 0) {
				detectCountry();
				unsubscribe();
			}
		});
	}

	async function detectCountry() {
		if (!browser) return;

		isLoading.set(true);
		error.set(null);

		try {
			const ipResponse = await fetch('https://ipapi.co/json/');
			if (!ipResponse.ok) throw new Error('Failed to fetch location data');

			const ipData = await ipResponse.json();
			const userCountryCode = ipData.country_code;

			const availableCountries = get(countries);
			if (userCountryCode && availableCountries?.some((c) => c.cca2 === userCountryCode)) {
				if (browser) {
					window.localStorage.setItem(STORAGE_KEY, userCountryCode);
				}
				innerSet(userCountryCode);
			}
		} catch (e) {
			const errorMessage = e instanceof Error ? e.message : 'Failed to detect country';
			error.set(errorMessage);
			console.error('Country detection failed:', e);
		} finally {
			isLoading.set(false);
		}
	}

	return {
		subscribe,
		set: (value: string) => {
			const availableCountries = get(countries);
			if (availableCountries?.some((c) => c.cca2 === value)) {
				if (browser) {
					window.localStorage.setItem(STORAGE_KEY, value);
				}
				innerSet(value);
			}
		},
		error,
		isLoading,
		detectCountry
	};
}

export const country = createCountryStore();
