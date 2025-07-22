<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let attribute = 'class';
	export let defaultTheme = 'light';
	export let enableSystem = false;

	const theme = writable(defaultTheme);

	function setTheme(newTheme: string) {
		theme.set(newTheme);
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute(attribute, newTheme);
		}
	}

	onMount(() => {
		if (enableSystem) {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			setTheme(systemTheme);
		} else {
			setTheme(defaultTheme);
		}

		theme.subscribe((value) => {
			document.documentElement.setAttribute(attribute, value);
		});
	});
</script>

<slot />
