<script>
  export let product;
</script>

<div class="product-item">
  <h2>{product.name}</h2>
  <p>Price: {product.price}</p>
  <p>Region: {product.region}</p>
</div>

<style>
  .product-item {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
  }
</style>
