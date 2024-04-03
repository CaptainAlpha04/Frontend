<script>

</script>

<main>
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