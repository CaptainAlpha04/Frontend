<script >
import ContentGrid from "../uicomponents/content-grid.svelte";
import Card from "../uicomponents/card.svelte";
import LineGraph from "../uicomponents/Graphs/lineGraph.svelte";
import Doughnut from "../uicomponents/Graphs/doughnut.svelte";
import BarGraph from "../uicomponents/Graphs/barGraph.svelte";
  import { onMount } from "svelte";

let complaint = []

function redirectRoute() {

}

onMount(() => {
    getComplaints();
})

async function getComplaints() {
        const response = await fetch(`http://localhost:5000/complaints/getAllComplaints`);
        complaint = await response.json();
        console.log(complaint)
    }

</script>

<main>
<h1>Dashboard</h1>
<ContentGrid>
<Card rowSpan = 2 columnSpan = 2 on:click={redirectRoute}>
    <Doughnut />
</Card>
<Card rowSpan = 2 columnSpan = 2>
    <BarGraph />
</Card>
<Card rowSpan = 3 columnSpan = 1>
    <h2>Complaints</h2>
    {#each complaint as c}
    <div>
        <div class="complaint-title">
            <h4>{c.title}</h4>
        </div>
        <p>{c.description}</p>
    </div>
    {/each}
</Card>
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

.complaint-title{
    display: flex;
    align-content: center;
}

</style>