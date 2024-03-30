<script>
import LoginPage from "./components/LoginPage.svelte";
import Dashboard from "./components/Dashboard.svelte";
let value = false;

function loginScreen(e) {    
  checkCookie();  
  value = e.detail;
}

function checkCookie() {
    if(document.cookie.includes('ABTasty')) {
      console.log("Exists");
    }
    else {
      console.log('doesnot exist');
    }
  }

</script>

<main>
<!-- {#if value}
<Dashboard />
{:else}
<LoginPage on:Access={loginScreen}/> 
{/if}  -->
<Dashboard />
</main>
  
<style>
  /* Component styles here */
</style>
  