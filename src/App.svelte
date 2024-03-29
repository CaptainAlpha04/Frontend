<script>
import LoginPage from "./components/LoginPage.svelte";
import Dashboard from "./components/Dashboard.svelte";
let value = false;

function loginScreen(e) {      
  value = e.detail;
}
</script>

<main>
{#if value}
<Dashboard />
{:else}
<LoginPage on:Access={loginScreen}/> 
{/if}
</main>
  
<style>
  /* Component styles here */
</style>
  