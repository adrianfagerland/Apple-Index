export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	slug: string;
	sku: string;
	price: {
		amount: number;
		currency: string;
	};
}