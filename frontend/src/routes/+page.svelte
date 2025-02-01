<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Search as SearchIcon } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import { country as selectedCountry } from '$lib/stores/useCountry';
	import { exchangeRates } from '$lib/stores/currency';
	import { countries } from '$lib/stores/countries';
	import type { Product } from '$lib/types/product';
	import { useVat } from '$lib/stores/useVat';
	import { goto } from '$app/navigation';

	export let data;

	function getPriceComparison(product: Product) {
		if (!$exchangeRates || !$countries || !$selectedCountry) return [];

		const targetCurrency =
			Object.keys($countries.find((c) => c.cca2 === $selectedCountry)?.currencies || {})[0] ||
			'USD';

		// Get all prices and convert them
		const allPrices = Object.entries(product.prices || {}).map(([country, price = 0]) => {
			const countryData = $countries.find((c) => c.cca2 === country);
			const currency = Object.keys(countryData?.currencies || {})[0] || 'USD';
			if (['US', 'CA'].includes(country)) {
				price *= 1 + (countryData?.vat_rate || 0) / 100;
			}
			let convertedPrice = convertPrice(price, currency, targetCurrency);

			if ($useVat && countryData?.cca2 !== $selectedCountry) {
				const vatRate = countryData?.vat_rate || 0;
				convertedPrice = convertedPrice / (1 + vatRate / 100);
			}

			return {
				country,
				convertedPrice,
				emoji: countryData?.flag || '',
				name: countryData?.name || country
			};
		});

		// Sort by price
		const sortedPrices = allPrices.sort((a, b) => a.convertedPrice - b.convertedPrice);

		// Get top 4 prices
		let displayPrices = sortedPrices.slice(0, 4);

		// Add selected country if not in top 4
		const selectedCountryIndex = sortedPrices.findIndex((p) => p.country === $selectedCountry);
		if (selectedCountryIndex >= 4) {
			displayPrices.push(sortedPrices[selectedCountryIndex]);
		}

		return displayPrices.map((price) => ({
			...price,
			rank: sortedPrices.findIndex((p) => p.country === price.country) + 1
		}));
	}

	function convertPrice(amount: number, fromCurrency: string, toCurrency: string) {
		if (!$exchangeRates[fromCurrency] || !$exchangeRates[toCurrency]) return amount;
		const inUSD = amount / $exchangeRates[fromCurrency];
		return inUSD * $exchangeRates[toCurrency];
	}
</script>

<svelte:head>
	<title>Apple Index - Compare Apple prices across the world</title>
	<meta
		name="description"
		content="Compare Apple product prices across different countries. This website is kind of like what The Mac Index used to be."
	/>
	<meta name="apple-mobile-web-app-title" content="Apple Index" />
</svelte:head>

<main class="container mx-auto py-8">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="mb-8 text-lg text-muted-foreground">
			Compare Apple product prices across different countries
		</h2>
		<Button
			variant="outline"
			class="w-full max-w-xl cursor-text justify-between text-muted-foreground"
			onclick={() =>
				document.dispatchEvent(
					new KeyboardEvent('keydown', {
						key: 'k',
						metaKey: true
					})
				)}
		>
			<div class="flex items-center gap-2">
				<SearchIcon class="h-4 w-4" />
				<span>Search products...</span>
			</div>
		</Button>
	</div>

	<div class="mt-12">
		<h2 class="mb-4 text-center">Featured products</h2>
		<div
			class="mx-auto grid max-w-[1024px] justify-center gap-6 sm:grid-cols-[repeat(auto-fit,minmax(0,320px))]"
		>
			{#each data.products as product}
				<Card
					class="overflow-hidden transition-shadow hover:shadow-lg"
					onclick={() => goto(`/${product.category}/${product.slug}`)}
				>
					<CardHeader class="p-0">
						<div
							class="flex h-48 items-center justify-center {product.name
								.toLowerCase()
								.includes('mac')
								? 'bg-white'
								: 'bg-[#f5f5f7]'}"
						>
							<img
								src={product.image}
								alt={product.name}
								class="h-auto max-h-full w-auto max-w-full object-contain p-4"
							/>
						</div>
					</CardHeader>
					<CardContent class="p-4">
						<CardTitle class="mb-4 text-xl">{product.name}</CardTitle>
						<div class="mt-4">
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head class="w-[40px] py-2">#</Table.Head>
										<Table.Head class="py-2">Country</Table.Head>
										<Table.Head class="py-2 text-right">Price</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each getPriceComparison(product) as { country, convertedPrice, emoji, rank, name }}
										<Table.Row class={country === $selectedCountry ? 'bg-muted/50' : ''}>
											<Table.Cell class="py-1">{rank}</Table.Cell>
											<Table.Cell class="py-1">
												<span class="inline-flex items-center gap-2">
													{emoji}
													<span class="inline">{name}</span>
												</span>
											</Table.Cell>
											<Table.Cell class="py-1 text-right">
												{convertedPrice.toLocaleString(undefined, {
													style: 'currency',
													currency:
														Object.keys(
															$countries.find((c) => c.cca2 === $selectedCountry)?.currencies || {}
														)[0] || 'USD'
												})}
											</Table.Cell>
										</Table.Row>
									{/each}
								</Table.Body>
							</Table.Root>
						</div>
					</CardContent>
					<CardFooter class="p-4">
						<Button variant="outline" class="w-full">View Details</Button>
					</CardFooter>
				</Card>
			{/each}
		</div>
	</div>
</main>
