<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Command from '$lib/components/ui/command/index.js';
	import { getProducts } from '$lib/utils/command-data';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	let open = $state(false);

	let products = getProducts();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	function handleSelect(command: string): void {
		goto(command);
		open = false;
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open>
	<Command.Input />
	<Command.List>
		<Command.Empty>No products found.</Command.Empty>
		<ScrollArea class="w-full py-1 pl-1 pr-2">
			{#each Object.entries(products) as [key, command]}
				<Command.Item onSelect={() => handleSelect(command)}>
					{key}
				</Command.Item>
			{/each}
		</ScrollArea>
	</Command.List>
</Command.Dialog>
