<script>
import { onMount } from "svelte";
import { darkTheme } from "../../themeStore.js";
export let columnSpan = 4;
export let rowSpan = 1;
export let backgroundColor;
export let backgroundImage;
let cardStyling = `grid-column-start: span ${columnSpan}; grid-row-start: span ${rowSpan}; background-color: ${backgroundColor}; background-image: url(${backgroundImage});`;

let isDark;
darkTheme.subscribe(value => {
    isDark = value;
    ChangeTheme();
});

onMount(() => {
   ChangeTheme();
});

function ChangeTheme() {
    if (isDark) {  
        cardStyling += `background-color: rgb(30, 30, 30);`
    }
    else {
        cardStyling += `background-color: rgb(255, 255, 255);`
}
}

</script>

<main style={cardStyling} class="card">
<slot>hello
</slot>
<!-- svelte-ignore a11y-img-redundant-alt -->
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

img {
    object-fit: cover;
    border-radius: 1rem;
}
</style>