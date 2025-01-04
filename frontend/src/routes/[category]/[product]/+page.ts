import { routes, type ProductCategory } from '$lib/config/routes';
import { error } from '@sveltejs/kit';
import type { Product } from '$lib/types/product';
import { products as productsStore } from '$lib/stores/products';

export const prerender = true;

export function entries() {
	const allRoutes = [];

	for (const categoryKey in routes) {
		const category = categoryKey as ProductCategory;
		for (const product of routes[category].products) {
			allRoutes.push({
				category,
				product: product.slug
			});
		}
	}

	return allRoutes;
}

export function load({ params }) {
	const category = params.category as ProductCategory;
	const { product } = params;

	if (!routes[category]) {
		throw error(404, 'Category not found');
	}

	const productConfig = routes[category].products.find((p) => p.slug === product);
	if (!productConfig) {
		throw error(404, 'Product not found');
	}

	// get the price data for this product
	let products: Product[] = [];
	productsStore.subscribe((value) => {
		products = value[productConfig.name];
	})();

	return {
		category,
		product: productConfig,
		products
	};
}
