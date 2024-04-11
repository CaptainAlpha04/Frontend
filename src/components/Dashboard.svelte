<script>
import { onMount } from 'svelte';
import Header from './microcomponents/Header.svelte';
import Home from "./Routes/Home.svelte";
import Student from './Routes/StudentRoute.svelte';
import Hostel from './Routes/HostelRoute.svelte';
import Services from './Routes/Services.svelte';
import Queries from './Routes/Queries.svelte';
import Security from './Routes/SecurityRoute.svelte';
import Account from './Routes/AccountRoute.svelte';
import NewStudentForm from './Routes/Subroutes/newStudentForm.svelte';

let NavigationRoute  = 0;
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

// onMount(() => {
//     ChangeTheme();
// });

// function ChangeTheme() {
//     document.body.style.backgroundColor = 'black';
//     document.querySelector('main').style.backgroundColor = 'black';
//     document.querySelector('section').style.backgroundColor = 'gray';
//     document.body.style.color = 'white';
// }

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
