<script>
import { createEventDispatcher, onMount } from "svelte";
import { darkTheme } from "../../themeStore.js";

const dispatch = createEventDispatcher();
let activeNav = 0;
let isDark;
let sectionStyling;
let colorSettings;
const navOptions = [
    { icon: 'fi fi-rr-house-chimney', id: 0 },
    { icon: 'fi fi-rr-user-graduate', id: 1 },
    { icon: 'fi fi-rr-building', id: 2 },
    { icon: 'fi fi-rr-hamburger-soda', id: 3 },
    { icon: 'fi fi-rr-messages-question', id: 4 },
    { icon: 'fi fi-rr-shield-keyhole', id: 5 },
];

function changeRoute(id) {
    activeNav = id;
    dispatch('changeRoute', id);
}

darkTheme.subscribe(value => {
    isDark = value;
    ChangeTheme();
});

onMount(() => {
   ChangeTheme();
});

function ChangeTheme() {
    if (isDark) {  
        sectionStyling = `background-color: rgb(30, 30, 30);`; 
        colorSettings = `color: white;`
    } else {
        sectionStyling = `background-color: var(--background-color);`;
        colorSettings = `color: #073347;`
    }
}

</script>

<section style={sectionStyling}>
    <img src="/resources/logo.png" alt="Persona" srcset="">
    {#each navOptions as { icon, id }}
        <div class="nav-btn {activeNav === id ? 'active' : ''}" on:click={() => changeRoute(id)}>
            <i class={icon} style={colorSettings}></i>
        </div>
    {/each}
    <div class="Account" on:click={() => changeRoute(6)}>
        <div class="accountImg">
            <img src="/resources/user-default.png" alt="User Account">
        </div>
    </div>
</section>

<style>
    section {
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--background-color);
        height: 100svh;
        width: 5svw;
        min-width: 4.5svw;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0.5rem;
    }
    
    .nav-btn {
        align-self: center;
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        padding: 0.05rem;
        border-radius: 1rem;
        cursor: pointer;
        transition: background-color 100ms ease-in-out;
    }
    
    i{
        font-size: 1.5rem;
        color: #073347;
    }
    
    .Account {
        margin-top: auto;
        margin-bottom: 1rem; 
        display:flex;
        justify-content: center;
        cursor: pointer;
    }
    
    .accountImg {
        background-color: rgb(192, 192, 192);
        border-radius: 100%;
        height: 3svw;
        width: 3svw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .accountImg img{
        width: 2.5svw;
        height: 2.5svw;
        max-height: 2.5svw;
    }
    .nav-btn:hover{
        background-color: rgba(0, 34, 146, 0.37);
    }
    :global(.active) {
        background-color: var(--tertiary-accent-color);
    }
    </style>