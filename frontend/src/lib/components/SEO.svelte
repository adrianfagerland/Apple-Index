<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import type { Product } from '$lib/types/product';
	import { onMount } from 'svelte';

	export let product: Product;

	let jsonLd: string;

	onMount(() => {
		const productSchema = {
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: product.name,
			image: product.image,
			description: product.description,
			brand: {
				'@type': 'Brand',
				name: 'Apple'
			},
			sku: product.sku,
			offers: {
				'@type': 'Offer',
				url: `${PUBLIC_SITE_URL}/${product.category}/${product.slug}`,
				priceCurrency: product.price.currency,
				price: product.price.amount,
				availability: 'https://schema.org/InStock',
				priceValidUntil: new Date().toISOString().split('T')[0]
			}
		};
		jsonLd = JSON.stringify(productSchema);
	});
</script>

<svelte:head>
	<title>{product.name} - Apple Index</title>
	<meta name="description" content={product.description} />
	<meta property="og:title" content={`${product.name} - Apple Index`} />
	<meta property="og:description" content={product.description} />
	<meta property="og:image" content={product.image} />
	<meta property="og:type" content="product" />
	<meta property="og:url" content={`${PUBLIC_SITE_URL}/${product.category}/${product.slug}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${product.name} - Apple Index`} />
	<meta name="twitter:description" content={product.description} />
	<meta name="twitter:image" content={product.image} />
	{#if jsonLd}
		<script type="application/ld+json">
			{@html jsonLd}
		</script>
	{/if}
</svelte:head>
