<script>
export let directoryPath = [];
export let activeCrumb;

import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

function changePath(path) {
    dispatch("changePath", path);
}
</script>

<div class="bread-crumb">
    <ul>
        {#each directoryPath as path}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class:active = {path === activeCrumb} on:click={()=>changePath(activeCrumb = path)}>{path}</li>
        {/each}
    </ul>
</div>

<style>
.bread-crumb {
    margin: 0 auto 0.5rem -3rem;
    align-self: flex-start;   
}
ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
}
li {
    padding: 0 0.5rem;
    cursor: pointer;
    color: silver;
}

.active {
    border-bottom: var(--tertiary-accent-color) 0.15rem solid;
    background-color: transparent;
    color: inherit;
    font-weight: 500;
}

</style>