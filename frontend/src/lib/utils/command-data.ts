import { routes, type ProductCategory } from '$lib/config/routes';

// getProducts function should return record from the name of the product to the slug for the goto command later
export function getProducts(): Record<string, string> {
	const productCommands: Record<string, string> = {};

	for (const categoryKey in routes) {
		const category = routes[categoryKey as ProductCategory];

		category.products.forEach((product) => {
			const path = `/${categoryKey}/${product.slug}`; // Generate path dynamically

			productCommands[product.name] = path;
		});
	}

	return productCommands;
}
