<script lang="ts">
	import { routes } from '$lib/config/routes';
	import * as Menubar from '$lib/components/ui/menubar';
	import { goto } from '$app/navigation';

	let { select } = $props();

	function handleSelect(category: string, product: any) {
		goto(`/${category}/${product.slug}`);
		select();
	}
</script>

<Menubar.Root>
	{#each Object.entries(routes) as [category, config]}
		<Menubar.Menu>
			<Menubar.Trigger class="cursor-pointer whitespace-nowrap px-2">
				{config.title}
			</Menubar.Trigger>
			<Menubar.Content>
				{#each config.products as product}
					<Menubar.Item
						class="cursor-pointer whitespace-nowrap"
						onclick={() => handleSelect(category, product)}
					>
						{product.name}
					</Menubar.Item>
				{/each}
			</Menubar.Content>
		</Menubar.Menu>
	{/each}
</Menubar.Root>
