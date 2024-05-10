<script >
    import ContentGrid from "../uicomponents/content-grid.svelte";
    import Card from "../uicomponents/card.svelte";
    import { onMount } from "svelte";

    let period = [
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"],
         ["Breakfast", "Lunch", "Dinner"]
     ];

    onMount(() => {
         const periodData = localStorage.getItem("period");
         if(periodData){
             period = JSON.parse(periodData);
         }
    })

    const updateValue = () => {
        localStorage.setItem("period", JSON.stringify(period));
    }

</script>

<main>
    <h1>Hostel Services</h1>
    <ContentGrid rowTemplate = 7 columnTemplate = 4>
        <Card columnSpan = 4>
            <div class = "heading-card">
                <p>Day</p>
                <p>Breakfast</p>
                <p>Lunch</p>
                <p>Dinner</p>    
            </div>
        </Card>
        <Card rowSpan = 7 columnSpan = 1>
            <div class = "day-card">
                <h3>Monday</h3>
                <h3>Tuesday</h3>
                <h3>Wednesday</h3>
                <h3>Thursday</h3>
                <h3>Friday</h3>
                <h3>Saturday</h3>
                <h3>Sunday</h3>
                </div>
            </Card>
        {#each period as meal}
        {#each meal as m}
        <Card rowSpan = 1 columnSpan = 1>
            <div class="meal-text">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <p contenteditable="true" on:input={updateValue}>{m}</p>
            </div>
        </Card>
         {/each}
        {/each}

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

    .heading-card {
        display: flex;  
        justify-content: space-around;
    }

    .day-card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .meal-text {
        display: flex;
        font-size: 1rem;
        justify-content: space-around;
    }

    p {
        cursor: pointer;
    }   
</style>