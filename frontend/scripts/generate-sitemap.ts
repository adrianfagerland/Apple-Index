import { routes, type ProductCategory } from '../src/lib/config/routes';
import { writeFile } from 'fs/promises';

const BASE_URL = 'https://appleindex.com';

async function generateSitemap() {
	// Add root page
	const pages = ['/'];

	// Add product pages using same logic as entries()
	for (const categoryKey in routes) {
		const category = categoryKey as ProductCategory;
		for (const product of routes[category].products) {
			pages.push(`/${category}/${product.slug}`);
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
			.map(
				(page) => `
    <url>
        <loc>${BASE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>`
			)
			.join('')}
</urlset>`;

	await writeFile('static/sitemap.xml', sitemap);
	console.log('Sitemap generated successfully');
}

generateSitemap().catch(console.error);
