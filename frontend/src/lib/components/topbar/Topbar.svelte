<script lang="ts">
	import { goto } from '$app/navigation';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CountrySelector from './CountrySelector.svelte';
	import Menubar from './Menubar.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { useVat } from '$lib/stores/useVat';
	import { Menu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Search from '$lib/components/Search.svelte';
	import { browser } from '$app/environment';

	function handleToggle(value: boolean) {
		$useVat = value;
	}

	let sheetOpen = false;

	function handleMenuSelect() {
		sheetOpen = false;
	}

	const isMac = browser && navigator.userAgent.toLowerCase().includes('mac');
	const modifierKey = isMac ? '⌘' : 'Ctrl';
</script>

<nav class="py-4">
	<div class="container flex items-center justify-between">
		<div>
			<button class="text-lg font-semibold" onclick={() => goto('/')}> Apple Index </button>
			<p class="text-xs text-muted-foreground hidden lg:block">
				Search with
				<kbd
					class="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-xs font-medium text-muted-foreground opacity-100"
				>
					{modifierKey} + K
				</kbd>
			</p>
		</div>
		<!-- <Menubar select={handleMenuSelect} /> -->
		<!-- Desktop Menu -->
		<div class="hidden space-x-2 md:flex">
			<Search />
			<div class="flex items-center space-x-1">
				<Switch id="vat" checked={$useVat} onCheckedChange={handleToggle} />
				<Label for="vat">Use VAT discount</Label>
			</div>
			<Menubar select={handleMenuSelect} />
			<CountrySelector />
			<ThemeToggle />
		</div>

		<!-- Mobile Menu Drawer (using Sheet component) -->
		<div class="ml-auto md:hidden">
			<Sheet.Root bind:open={sheetOpen}>
				<Sheet.Trigger>
					<div
						class="inline-flex h-10 w-10 items-center justify-center rounded-md p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground"
					>
						<Menu />
					</div>
				</Sheet.Trigger>
				<Sheet.Content>
					<div class="flex flex-col justify-end space-y-4 p-4">
						<div class="ml-auto w-fit">
							<Menubar select={handleMenuSelect} />
						</div>
						<Separator />
						<div class="ml-auto">
							<CountrySelector />
						</div>
						<Separator />
						<div class="ml-auto flex items-center space-x-2">
							<Label for="vat-mobile">Use VAT discount</Label>
							<Switch id="vat-mobile" checked={$useVat} onCheckedChange={handleToggle} />
						</div>
						<Separator />
						<div class="ml-auto w-fit">
							<ThemeToggle />
						</div>
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</nav>
<Separator />
