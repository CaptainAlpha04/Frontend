<script >
import ContentGrid from "../uicomponents/content-grid.svelte";
import Card from "../uicomponents/card.svelte";
import {createEventDispatcher} from "svelte";
import Breadcrumb from "../uicomponents/breadcrumb.svelte";

const redirectPath = createEventDispatcher();

function redirectRoute() {
    
}

</script>

<main>
<h1>Dashboard</h1>
<ContentGrid>
<Card rowSpan = 2 columnSpan = 2 on:click={redirectRoute}/>
<Card rowSpan = 2 columnSpan = 2/>
<Card rowSpan = 8 columnSpan = 1/>
<Card rowSpan = 1 columnSpan = 1/>
<Card rowSpan = 1 columnSpan = 1/>
</ContentGrid>
</main>

<style>
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    left: 6.7svw;
}

</style>