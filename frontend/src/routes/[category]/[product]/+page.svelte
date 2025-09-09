<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { exchangeRates } from '$lib/stores/currency';
	import { country as selectedCountry } from '$lib/stores/useCountry';
	import { useVat } from '$lib/stores/useVat';
	import { browser } from '$app/environment';
	import { countries } from '$lib/stores/countries';
	import type { Product } from '$lib/types/product';
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';
	import { HelpCircle } from 'lucide-svelte';

	export let data;
	let products: Product[] = [];

	// Define attribute priority order (highest to lowest)
	const attributePriority = [
		'case',
		'size',
		'model',
		'screen_size',
		'chip',
		'memory',
		'storage',
		'gpu_count',
		'connectivity',
		'glass',
		'form_factor'
	] as const;

	$: {
		if (data?.products) {
			products = data.products;
			// Initialize filters after products are loaded with only valid options
			selectedFilters = attributePriority.reduce(
				(acc, attr) => {
					const availableValues = getAvailableValues(attr, acc); // Use acc to consider previous selections
					if (attr === 'glass' && availableValues.includes('Standard')) {
						return { ...acc, [attr]: 'Standard' };
					}
					return {
						...acc,
						[attr]: availableValues.length > 0 ? availableValues[0] : null
					};
				},
				{} as Record<(typeof attributePriority)[number], any>
			);
		}
	}

	function getUserLocale() {
		return browser ? navigator.language : 'en-US';
	}

	$: productImage = data.product.image;

	function convertToGB(value: string): number {
		if (typeof value !== 'string') return 0;
		const match = value.toLowerCase().match(/(\d+)\s*(tb|gb)/);
		if (!match) return 0;
		const [, size, unit] = match;
		return unit === 'tb' ? parseInt(size) * 1024 : parseInt(size);
	}

	// Add this helper function after the existing functions
	function getChipSortOrder(chip: string): number {
		if (chip.includes('Max')) return 2;
		if (chip.includes('Pro')) return 1;
		return 0;
	}

	// New function to get ALL possible values for an attribute
	function getAllValues(attribute: (typeof attributePriority)[number]) {
		const values = [...new Set(products.map((p) => p[attribute]).filter(Boolean))];

		if (attribute === 'chip') {
			return values.sort((a, b) => {
				const orderA = getChipSortOrder(String(a));
				const orderB = getChipSortOrder(String(b));
				if (orderA !== orderB) return orderA - orderB;
				return String(a).localeCompare(String(b));
			});
		}
		// Special sorting for storage capacity
		if (values.some((v) => String(v).match(/\d+\s*(TB|GB)/i))) {
			return values.sort((a, b) => convertToGB(String(a)) - convertToGB(String(b)));
		}
		// Special sorting for glass attribute
		if (attribute === 'glass') {
			return values.sort((a, b) => {
				if (a === 'Standard') return -1;
				if (b === 'Standard') return 1;
				return String(a).localeCompare(String(b));
			});
		}

		return values.sort();
	}

	// Function to check if a value is available with current filters
	function isValueAvailable(
		attribute: (typeof attributePriority)[number],
		value: any,
		currentFilters: typeof selectedFilters
	) {
		const priorityIndex = attributePriority.indexOf(attribute);
		return products.some((product) => {
			const matchesHigherPriority = attributePriority.slice(0, priorityIndex).every((key) => {
				if (!currentFilters[key]) return true;
				return product[key] === currentFilters[key];
			});
			return matchesHigherPriority && product[attribute] === value;
		});
	}

	function getAvailableValues(
		attribute: (typeof attributePriority)[number],
		currentFilters: typeof selectedFilters
	) {
		// Filter products based on higher priority selections
		const priorityIndex = attributePriority.indexOf(attribute);
		const filteredByPriority = products.filter((product) => {
			return attributePriority.slice(0, priorityIndex).every((key) => {
				if (!currentFilters[key]) return true;
				return product[key] === currentFilters[key];
			});
		});

		// Get unique values
		const values = [...new Set(filteredByPriority.map((p) => p[attribute]).filter(Boolean))];

		// Special sorting based on attribute type
		if (attribute === 'glass') {
			return values.sort((a, b) => {
				if (a === 'Standard') return -1;
				if (b === 'Standard') return 1;
				return String(a).localeCompare(String(b));
			});
		}

		if (attribute === 'storage') {
			return values.sort((a, b) => convertToGB(String(a)) - convertToGB(String(b)));
		}

		return values.sort();
	}

	function updateLowerPriorityFilters(
		changedAttribute: (typeof attributePriority)[number],
		value: any
	) {
		// Start with the changed filter
		selectedFilters[changedAttribute] = value;

		// Get the index of changed attribute
		const startIndex = attributePriority.indexOf(changedAttribute);

		// Update all lower priority filters
		for (let i = startIndex + 1; i < attributePriority.length; i++) {
			const attr = attributePriority[i];
			const availableValues = getAvailableValues(attr, selectedFilters);

			// Keep current value if it's still available
			if (availableValues.includes(selectedFilters[attr])) {
				continue;
			}

			// Otherwise select first available value or null
			selectedFilters[attr] = availableValues.length > 0 ? availableValues[0] : null;
		}
	}

	// Modify the initialization to use getAllValues instead
	let selectedFilters: Record<(typeof attributePriority)[number], any> = attributePriority.reduce(
		(acc, attr) => {
			const allValues = getAllValues(attr);
			return {
				...acc,
				[attr]: allValues.length > 0 ? allValues[0] : null
			};
		},
		{} as Record<(typeof attributePriority)[number], any>
	);

	// Reactive statement to update available filters
	$: availableFilters = attributePriority.reduce(
		(acc, attr) => {
			return {
				...acc,
				[attr]: getAvailableValues(attr, selectedFilters)
			};
		},
		{} as Record<(typeof attributePriority)[number], any[]>
	);

	// Filter products based on selected attributes
	$: filteredProducts = products.filter((product) => {
		return attributePriority.every((key) => {
			if (!selectedFilters[key]) return true;
			return product[key] === selectedFilters[key];
		});
	});

	// Update the sortedPricing reactive statement
	$: sortedPricing =
		$exchangeRates && $countries && $selectedCountry
			? filteredProducts
					.flatMap((product): PriceEntry[] => {
						const targetCurrency =
							Object.keys(
								$countries.find((c) => c.cca2 === $selectedCountry)?.currencies || {}
							)[0] || 'USD';

						return Object.entries(product.prices || {}).map(([country, price = 0]) => {
							const countryData = $countries.find((c) => c.cca2 === country);
							const currency = Object.keys(countryData?.currencies || {})[0] || 'USD';
							// if the country is US or CA, we upscale the price by their corresponding VAT rate
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
								currency,
								computedPrice: price,
								convertedPrice,
								emoji: countryData?.flag || '',
								rank: 0
							};
						});
					})
					.sort((a, b) => a.convertedPrice - b.convertedPrice)
					.map((entry, index) => ({
						...entry,
						rank: index + 1
					}))
			: [];

	// Update PriceEntry interface
	interface PriceEntry {
		country: string;
		currency: string;
		computedPrice: number;
		convertedPrice: number;
		emoji: string;
		rank: number;
	}

	function convertPrice(amount: number, fromCurrency: string, toCurrency: string) {
		if (!$exchangeRates[fromCurrency] || !$exchangeRates[toCurrency]) return amount;
		const inUSD = amount / $exchangeRates[fromCurrency];
		return inUSD * $exchangeRates[toCurrency];
	}
</script>

<SEO product={data.product} />

<div class="container mx-auto max-w-7xl py-8">
	<h1 class="mb-2 text-4xl font-bold">{data.product.name} Price Comparison</h1>
	<h2 class="mb-8 text-lg text-muted-foreground">
		Compare prices for the {data.product.name} across different countries and find the cheapest
		region to buy it. Prices are updated regularly to ensure you get the most accurate information.
	</h2>

	<!-- Configuration Panel with Image -->
	<div class="mb-12 rounded-lg bg-muted/50 p-6">
		<div class="grid gap-6 md:grid-cols-2">
			<!-- Right side: Product Image -->
			<div class="content-hug order-first w-full overflow-hidden rounded-lg md:order-last">
				<div
					class="relative flex max-h-[350px] items-center justify-center overflow-hidden rounded-lg"
				>
					<img
						src={productImage}
						alt={data.product.name}
						class="ml-auto h-auto max-h-[350px] rounded-lg object-contain"
						loading="lazy"
					/>
				</div>
			</div>

			<!-- Left side: Configuration options -->
			<div class="space-y-6">
				{#each attributePriority as attr}
					{#if availableFilters[attr]?.length > 0}
						<div class="space-y-2">
							<label for="{attr}-group" class="text-sm font-medium">
								{attr
									.split('_')
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(' ')}
							</label>
							<div id="{attr}-group" role="group" class="flex flex-wrap gap-2">
								{#each getAllValues(attr) as value}
									<Button
										variant={selectedFilters[attr] === value ? 'default' : 'outline'}
										size="sm"
										class={cn(
											'transition-opacity',
											!isValueAvailable(attr, value, selectedFilters) && 'opacity-50'
										)}
										disabled={!isValueAvailable(attr, value, selectedFilters)}
										onclick={() => {
											updateLowerPriorityFilters(attr, value);
										}}
									>
										{#if attr === 'memory'}
											{value}GB
										{:else if attr === 'screen_size'}
											{value}"
										{:else}
											{value}
										{/if}
									</Button>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
				<!-- if there are no available filets for any of the attributes, we need to include an appropriat message -->
				{#if Object.values(availableFilters).every((values) => values.length === 0)}
					<p class="text-sm text-gray-500">No configurations available for this product</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Pricing Table -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Rank</Table.Head>
					<Table.Head>Country</Table.Head>
					<Table.Head class="hidden text-right text-gray-500 md:table-cell">Local Price</Table.Head>
					<Table.Head class="text-right">Price</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sortedPricing as { country, currency, computedPrice, convertedPrice, emoji, rank }}
					<Table.Row>
						<Table.Cell class="font-medium">#{rank}</Table.Cell>
						<Table.Cell>
							<span class="inline-flex items-center gap-2">
								{#if browser && navigator.userAgent.toLowerCase().includes('win')}
									<img
										src="https://flagcdn.com/{country.toLowerCase()}.svg"
										alt={`Flag of ${country}`}
										width="15"
										loading="lazy"
										decoding="async"
									/>
								{:else}
									<span>{emoji}</span>
								{/if}
								<span>{$countries.find((c) => c.cca2 === country)?.name || country}</span>
							</span>
						</Table.Cell>
						<Table.Cell class="hidden items-center text-right text-gray-500 md:table-cell">
							{computedPrice.toLocaleString(getUserLocale(), {
								style: 'currency',
								currency: currency
							})}
							{#if ['US', 'CA'].includes(country)}
								<Tooltip.Provider>
									<Tooltip.Root delayDuration={0}>
										<Tooltip.Trigger>
											<HelpCircle class="h-3 w-3" />
										</Tooltip.Trigger>
										<Tooltip.Content sideOffset={8}>
											<p>
												Apple does not display the prices including VAT for the US and Canada, as
												they vary by state.
											</p>
											<p>
												The population-weighted average VAT has therefore been used to calculate
												this local price.
											</p>
											<p>For the US this average is 7.46%, and for Canada it is 11.2%</p>
										</Tooltip.Content>
									</Tooltip.Root>
								</Tooltip.Provider>
							{/if}
						</Table.Cell>
						<Table.Cell class="text-right">
							<div class="flex flex-col items-end">
								{#if $exchangeRates[Object.keys($countries.find((c) => c.cca2 === country)?.currencies || {})[0] || 'USD'] && $exchangeRates[Object.keys($countries.find((c) => c.cca2 === $selectedCountry)?.currencies || {})[0] || 'USD']}
									<span>
										{convertedPrice.toLocaleString(getUserLocale(), {
											style: 'currency',
											currency:
												Object.keys(
													$countries.find((c) => c.cca2 === $selectedCountry)?.currencies || {}
												)[0] || 'USD'
										})}
									</span>
								{:else}
									<span class="text-gray-500">N/A</span>
								{/if}
								<span class="text-gray-500 md:hidden">
									{computedPrice.toLocaleString(getUserLocale(), {
										style: 'currency',
										currency: currency
									})}
									{#if ['US', 'CA'].includes(country)}
										<Popover.Root>
											<Popover.Trigger>
												<HelpCircle class="h-3 w-3" />
											</Popover.Trigger>
											<Popover.Content
												sideOffset={8}
												class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
											>
												<div class="space-y-2">
													<p>
														Apple does not display the prices including VAT for the US and Canada,
														as they vary by state. The population-weighted average VAT has therefore
														been used to calculate this local price. For the US this average is
														7.46%, and for Canada it is 11.2%
													</p>
												</div>
											</Popover.Content>
										</Popover.Root>
									{/if}
								</span>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
