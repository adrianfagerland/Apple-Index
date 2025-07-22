import { writeFile, readFile } from 'fs/promises';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: resolve(__dirname, '../.env') });

const BASE_URL = process.env.PUBLIC_SITE_URL || 'https://apple-index.com';

function getCategoryFromProductName(productName: string): string {
	const lowerCaseName = productName.toLowerCase();
	if (lowerCaseName.includes('mac')) {
		return 'mac';
	}
	if (lowerCaseName.includes('ipad')) {
		return 'ipad';
	}
	if (lowerCaseName.includes('iphone')) {
		return 'iphone';
	}
	return 'others';
}

function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

async function generateSitemap() {
	// Add root page
	const pages = ['/'];

	const productsData = await readFile(resolve(__dirname, '../../backend/products.json'), 'utf-8');
	const products = JSON.parse(productsData);

	for (const productName in products) {
		const category = getCategoryFromProductName(productName);
		const slug = slugify(productName);
		pages.push(`/${category}/${slug}`);
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

	await writeFile(resolve(__dirname, '../static/sitemap.xml'), sitemap);
	console.log('Sitemap generated successfully');
}

generateSitemap().catch(console.error);
