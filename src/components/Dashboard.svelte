<script>
import Header from './microcomponents/Header.svelte';
import Home from "./Routes/Home.svelte";
import Student from './Routes/StudentRoute.svelte';
import Hostel from './Routes/HostelRoute.svelte';
import Services from './Routes/Services.svelte';
import Queries from './Routes/Queries.svelte';
import Security from './Routes/SecurityRoute.svelte';
import Account from './Routes/AccountRoute.svelte';

let NavigationRoute  = 0;
const Route = 'Home';
const HandleNavigation = (e) => {
    NavigationRoute = e.detail;
}


function ChangeTheme() {
    document.body.style.backgroundColor = 'black';
}

</script>

<main>
    <Header on:NavOption = {HandleNavigation}/>
    {#if NavigationRoute === 0}
    <Home />
    {:else if NavigationRoute === 1}
    <Student />
    {:else if NavigationRoute === 2}
    <Hostel />
    {:else if NavigationRoute === 3}
    <Services />
    {:else if NavigationRoute === 4}
    <Queries />
    {:else if NavigationRoute === 5}
    <Security />
    {:else if NavigationRoute === 6}
    <Account />
    {/if}
</main>
<style>
main{
    display: grid;
    justify-items: center;
}

</style>