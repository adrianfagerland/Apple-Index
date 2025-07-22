import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import type { Products } from '$lib/types/product';
import productData from '$lib/data/product-prices.json';

const CACHE_KEY = 'apple-index-products';
const CACHE_VERSION = '0';
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

function createProductStore() {
	const store: Writable<Products> = writable({});

	function loadFreshData() {
		store.set(productData);
		if (browser) {
			localStorage.setItem(
				CACHE_KEY,
				JSON.stringify({
					version: CACHE_VERSION,
					data: productData,
					timestamp: Date.now()
				})
			);
		}
	}

	function initialize() {
		if (browser) {
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				const { data, timestamp, version } = JSON.parse(cached);
				if (version === CACHE_VERSION && Date.now() - timestamp < CACHE_DURATION) {
					store.set(data);
					return;
				}
			}
		}
		loadFreshData();
	}

	initialize();

	return {
		subscribe: store.subscribe,
		refresh: () => loadFreshData() // Add refresh function
	};
}

export const products = createProductStore();
