<script>
import Card from "./card.svelte";
export let cardsProperties;
</script>

<main>
    {#each cardsProperties as { columnSpan, rowSpan }, i}
    <Card columnSpan={columnSpan} rowSpan={rowSpan} />
    {/each}
</main>

<style>
main{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    gap: 0.5rem;
    width: 80svw;
    grid-template-rows: repeat(5, 1fr);
}

</style>