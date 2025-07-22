<script lang="ts">
  import { country } from '$lib/stores/useCountry';
  import { convertPrice, currencySymbol, formatPrice } from '$lib/stores/useCurrency';
  import type { Product } from '$lib/types/product';
  import { get } from 'svelte/store';

  export let initialProducts: Product[] = [];

  const countryEmojis = {
    US: '🇺🇸', UK: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', JP: '🇯🇵',
    DE: '🇩🇪', FR: '🇫🇷', IT: '🇮🇹', ES: '🇪🇸', CN: '🇨🇳'
  };

  const currencySymbols = {
    US: '$', UK: '£', CA: 'C$', AU: 'A$', JP: '¥',
    DE: '€', FR: '€', IT: '€', ES: '€', CN: '¥'
  };

  // Reactively calculate country rankings for a given product
  function getCountriesRanking(product: Product, selectedCountry: string) {
    const prices = product.prices;
    return Object.entries(prices)
      .map(([countryCode, price]) => ({
        country: countryCode,
        localPrice: price,
        convertedPrice: convertPrice(price, countryCode, selectedCountry),
      }))
      .sort((a, b) => a.convertedPrice - b.convertedPrice);
  }

  // Reactively determine the countries to display
  function getDisplayCountries(product: Product, selectedCountry: string) {
    const ranking = getCountriesRanking(product, selectedCountry);
    const selectedCountryRank = ranking.findIndex((item) => item.country === selectedCountry);

    let displayCountries = ranking.slice(0, 3);
    if (selectedCountryRank >= 3) {
      displayCountries[2] = { ...ranking[selectedCountryRank], rank: selectedCountryRank + 1 };
    }

    return displayCountries;
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each initialProducts as product}
    {#if product}
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-2 dark:text-white">{product.name}</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
        <p class="text-2xl font-bold mb-4 dark:text-white">
          {currencySymbols[get(country) as keyof typeof currencySymbols]}{formatPrice(product.prices[get(country) as keyof typeof product.prices], get(country))}
        </p>
        <div class="space-y-2">
          <p class="font-semibold dark:text-white">Cheapest countries:</p>
          {#each getDisplayCountries(product, get(country)) as c, index}
            <p class="text-sm dark:text-gray-300">
              {c.rank ? `${c.rank}.` : `${index + 1}.`} {countryEmojis[c.country]} {c.country}:
              <span class="font-medium"> ({currencySymbols[get(country)]}{formatPrice(c.convertedPrice, get(country))})</span>
              <span class="text-gray-500 dark:text-gray-400">
                {currencySymbols[c.country]}{formatPrice(c.localPrice, c.country)}
              </span>
            </p>
          {/each}
        </div>
      </div>
    {/if}
  {/each}
</div>