import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';
export const prerender = true;

export function load() {
	return {
		metadata: {
			title: 'Apple Index',
			description: 'Compare Apple product prices across different countries.'
		}
	};
}
injectAnalytics({
	mode: dev ? 'development' : 'production'
});
