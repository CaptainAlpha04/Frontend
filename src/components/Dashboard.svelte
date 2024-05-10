<script>
import {onMount} from 'svelte';
import Header from './microcomponents/Header.svelte';
import Home from "./Routes/Home.svelte";
import Student from './Routes/StudentRoute.svelte';
import Hostel from './Routes/HostelRoute.svelte';
import Services from './Routes/Services.svelte';
import Queries from './Routes/Queries.svelte';
import Security from './Routes/SecurityRoute.svelte';
import Account from './Routes/AccountRoute.svelte';
import { darkTheme } from '../themeStore';

let isDark;
let NavigationRoute  = 0;
Header.activeNav = NavigationRoute;
const routes = {
    0: Home,
    1: Student,
    2: Hostel,
    3: Services,
    4: Queries,
    5: Security,
    6: Account
};

const HandleNavigation = (e) => {
    NavigationRoute = e.detail;
}
// Subscribe to the store
darkTheme.subscribe(value => {
    isDark = value;
    ChangeTheme();
});

function ChangeTheme() {
        const body = document.body;
        if (isDark) {  
                body.style.backgroundColor = 'rgb(0, 0, 0)'; 
                body.style.color = 'white';
        } else {
                body.style.backgroundColor = 'white'; 
                body.style.color = 'black';
        }
}

onMount(() => {
   ChangeTheme();
});

</script>

<main>
    <Header on:changeRoute={HandleNavigation}/>
    <svelte:component this={routes[NavigationRoute]} />
</main>

<style>
main{
    display: grid;
    justify-items: center;
}
</style>
