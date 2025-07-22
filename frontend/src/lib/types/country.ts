export interface Country {
	name: string; // Common name (e.g. "United States")
	cca2: string; // ISO 3166-1 alpha-2 code (e.g. "US")
	currencies: {
		[key: string]: {
			// Currency code as key (e.g. "USD")
			name: string; // Currency name (e.g. "United States dollar")
			symbol: string; // Currency symbol (e.g. "$")
		};
	};
	flag: string; // Flag emoji (e.g. "🇺🇸")
	altSpellings: string[];
	vat_rate: number | null; // Add vat_rate (can be null for countries without VAT)
}
