<script>
    import { onMount } from "svelte";
    import { darkTheme } from "../../themeStore.js";

    export let imgSrc = "";
    export let studentName = "Ali Imran";
    export let QalamID = 455280;
    export let school = "school";
    export let department = "department";
    export let attendanceStatus = "Present";

    let isDark;
    let cardStyling = "";
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
    
    <main style = {cardStyling} class="card" on:click>
    <img src={imgSrc} alt="Student">
    <h4>{QalamID}</h4>
    <h4>{studentName}</h4>
    <h4>{school}</h4>
    <h4>{department}</h4>
    <h4>{attendanceStatus}</h4>
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
        grid-column-start: span 5;
        grid-row-start: span 1;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        justify-content: space-around;
        
    }
    
    main:hover{
        transform: scale3d(1.02, 1.02, 1);
    }
    </style>