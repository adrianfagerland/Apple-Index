<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { country } from '$lib/stores/useCountry';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import Search from 'lucide-svelte/icons/search';
	import { cn } from '$lib/utils';
	import type { Country } from '$lib/types/country';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import getCurrencySymbol from '$lib/utils/getCurrencySymbol';
	import { countries } from '$lib/stores/countries';
	import { browser } from '$app/environment';

	let filteredCountries: Country[] = [];
	let open = false;
	let searchQuery = '';

	$: filteredCountries = $countries.filter((country) => {
		if (!searchQuery) return true;
		if (searchQuery === ' ' || searchQuery === '') return true;
		const searchTerm = searchQuery.toLowerCase().trim();
		return (
			country.name.toLowerCase().includes(searchTerm) ||
			getCurrencySymbol(country).toLowerCase().includes(searchTerm) ||
			(country.altSpellings &&
				country.altSpellings.some((alt) => alt.toLowerCase().includes(searchTerm)))
		);
	});

	function selectCountry(countryCode: string) {
		open = false;
		country.set(countryCode);
	}

	// Calculate the height of the virtual list
	$: listHeight = Math.min(filteredCountries.length * 32, 400); // Assuming each item is 40px high
</script>

<Popover.Root bind:open>
	<Popover.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'gap-1 pl-3 pr-2')}>
		{#if $country}
			{#if browser && navigator.userAgent.toLowerCase().includes('win')}
				<img
					src="https://flagcdn.com/{$country.toLowerCase()}.svg"
					alt={`Flag of ${$country}`}
					width="15"
				/>
			{:else}
				{$countries.find((c) => c.cca2 === $country)?.flag}
			{/if}

			<span class="overflow-hidden text-ellipsis"
				>{$countries.find((c) => c.cca2 === $country)?.name}</span
			>
			<span class="shrink-0 text-muted-foreground">
				{getCurrencySymbol($countries.find((c) => c.cca2 === $country))}
			</span>
		{:else}
			Select your country...
		{/if}
		<ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="mt-1 p-0">
		<Command.Root>
			<div class="flex items-center border-b px-2">
				<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
				<input
					type="text"
					placeholder="Search country..."
					bind:value={searchQuery}
					class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>
			<Command.Empty>No country found.</Command.Empty>
			<Command.Group>
				<VirtualList
					items={filteredCountries}
					let:item={c}
					height={listHeight + 'px'}
					class="max-h-[400px] overflow-y-auto"
				>
					<Command.Item
						value={c.name}
						onSelect={() => {
							selectCountry(c.cca2);
						}}
						class="flex cursor-pointer items-center overflow-hidden whitespace-nowrap px-1"
						--
					>
						<Check class={cn('h-4 w-4 shrink-0', $country !== c.cca2 && 'text-transparent')} />
						{#if browser && navigator.userAgent.toLowerCase().includes('win')}
							<img
								src="https://flagcdn.com/{c.cca2.toLowerCase()}.svg"
								alt={`Flag of ${c.name}`}
								width="15"
							/>
						{:else}
							{c.flag}
						{/if}
						<span class="ml-2 overflow-hidden text-ellipsis">{c.name}</span>
						<span class="ml-auto shrink-0 text-muted-foreground">
							{getCurrencySymbol(c)}
						</span>
					</Command.Item>
				</VirtualList>
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

<style>
	/* Target the VirtualList container */
	:global(svelte-virtual-list-viewport) {
		scrollbar-width: thin; /* Firefox */
		scrollbar-color: rgb(156 163 175) transparent; /* Firefox */
	}

	/* Webkit browsers (Chrome, Safari, Edge) */
	:global(svelte-virtual-list-viewport::-webkit-scrollbar) {
		width: 8px;
	}

	:global(svelte-virtual-list-viewport::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(svelte-virtual-list-viewport::-webkit-scrollbar-thumb) {
		background-color: rgb(156 163 175);
		border-radius: 20px;
		border: 2px solid transparent;
	}

	:global(svelte-virtual-list-viewport::-webkit-scrollbar-thumb:hover) {
		background-color: rgb(107 114 128);
	}
</style>
