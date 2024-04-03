<script>
export let columnSpan = 4;
export let rowSpan = 1;
let gridSpan = `grid-column-start: span ${columnSpan}; grid-row-start: span ${rowSpan}`;
</script>

<main style={gridSpan}>
<slot>hello</slot>
</main>

<style>
main {
    background-color: rgb(255, 255, 255);
    min-width: 0svw;
    min-height: 0svh;
    max-width: 100svw;
    max-height: 100svh;
    border-radius: 1rem;
    padding: 0.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
    transition: all 100ms ease;
    
}

main:hover{
    transform: scale3d(1.02, 1.02, 1);
}
</style>