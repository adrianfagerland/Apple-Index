<script>
  import ProductItem from './ProductItem.svelte';

  export let products = [];
</script>

<div class="product-list">
  {#each products as product}
    <ProductItem {product} />
  {/each}
</div>

<style>
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
</style>
