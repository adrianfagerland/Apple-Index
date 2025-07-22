<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";

  let theme: "light" | "dark" = "dark";

  onMount(() => {
    theme = document.documentElement.getAttribute("class") as "light" | "dark" || "dark";
  });

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("class", theme);
  }
</script>

<Button 
  variant="ghost" 
  size="icon" 
  onclick={toggleTheme}
  aria-label="Toggle theme"
>
  {#if theme === "dark"}
    <Sun class="h-5 w-5" />
  {:else}
    <Moon class="h-5 w-5" />
  {/if}
</Button>