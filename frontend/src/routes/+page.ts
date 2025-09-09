import { routes } from '$lib/config/routes';
import { products as productsStore } from '$lib/stores/products';

export interface FeaturedProduct {
	name: string;
	image: string;
	slug: string;
	category: string;
}

// Define featured products
const FEATURED_PRODUCTS = [
	{ category: 'mac', slug: 'macbook-air' },
	{ category: 'iphone', slug: 'iphone-17' },
	{ category: 'ipad', slug: 'ipad-air' },
	{ category: 'mac', slug: 'macbook-pro' },
	{ category: 'iphone', slug: 'iphone-17-pro' },
	{ category: 'mac', slug: 'mac-mini' },
] as const;

export function load() {
	const selectedProducts: FeaturedProduct[] = [];

	productsStore.subscribe((value) => {
		FEATURED_PRODUCTS.forEach(({ category, slug }) => {
			const productConfig = routes[category].products.find((p) => p.slug === slug);
			if (productConfig && value[productConfig.name]?.length > 0) {
				selectedProducts.push({
					...value[productConfig.name][0],
					name: productConfig.name,
					image: productConfig.image,
					slug: productConfig.slug,
					category
				});
			}
		});
	})();

	return {
		products: selectedProducts
	};
}
