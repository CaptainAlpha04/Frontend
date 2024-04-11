<script>
export let showModal = false;

const manageModalState = () => {
    showModal = false;
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click|self={manageModalState}>
<div class="modalBox">
    <slot></slot>
</div>
</main>

<style>
main {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100svw;
    height: 100svh;
    position: fixed;
    z-index: 2;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
}
.modalBox {
    display: grid;
    background-color: whitesmoke;
    padding: 2rem;
    gap: 1rem;
    border-radius: 1rem;
}

</style>