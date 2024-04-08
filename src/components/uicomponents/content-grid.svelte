<script>
export let columnTemplate = 5;
export let rowTemplate = 5;

let gridStyle = `grid-template-columns: repeat(${columnTemplate}, 1fr); grid-template-rows: repeat(${rowTemplate}, 1fr);`;

</script>

<main style={gridStyle}>
    <slot></slot>
</main>

<style>
main{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    gap: 0.5rem;
    width: 80svw;
    grid-template-rows: repeat(5, 1fr);
}

</style>