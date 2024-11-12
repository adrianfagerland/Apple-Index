<script>
  import { onMount } from 'svelte';
  import ProductList from './components/ProductList.svelte';
  import { fetchProductPrices } from './api';

  let products = [];

  onMount(async () => {
    products = await fetchProductPrices();
  });
</script>

<main>
  <h1>Apple Product Prices</h1>
  <ProductList {products} />
</main>

<style>
  main {
    padding: 1rem;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>
