<script>
    import ContentGrid from "../uicomponents/content-grid.svelte"; 
    import Card from "../uicomponents/card.svelte";
    import { onMount } from "svelte";
  import { get } from "svelte/store";


    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentDay = currentDate.getDay();
    console.log(currentDay)
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
        getMealData();
        const periodData = localStorage.getItem("period");
        if (periodData) {
            period = JSON.parse(periodData);
        }
        console.log(currentDay)
    });

    const updateValue = (e, i, j) => {
        period[i][j] = e.target.innerText;
        console.log(period);
        localStorage.setItem("period", JSON.stringify(period));
        updateMealData();  
    };

    function isMealTime(hour, mealIndex) {
        if (mealIndex === 0) return hour >= 9 && hour <= 11; // Breakfast time
        if (mealIndex === 1) return hour >= 12 && hour <= 14; // Lunch time
        if (mealIndex === 2) return hour >= 18 && hour <= 20; // Dinner time
        return false;
    }

    async function updateMealData() {
        const response = await fetch("http://localhost:5000/api/mess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ period }),
        });
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            console.log("Data updated successfully");
        } else {
            console.log("Data not updated");
        }
    }

    async function getMealData() {
        const response = await fetch("http://localhost:5000/api/messData");
        if (response.status === 200) {
            localStorage.setItem("period", response);
        } else {
            console.log("Data not fetched");
        }
    
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
                <h3>Sunday</h3>
                <h3>Monday</h3>
                <h3>Tuesday</h3>
                <h3>Wednesday</h3>
                <h3>Thursday</h3>
                <h3>Friday</h3>
                <h3>Saturday</h3>
                </div>
        </Card>
    {#each period as meal, i}
        {#each meal as m, j}
        <Card rowSpan = 1 columnSpan = 1>
            <div class="meal-text">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <p 
                class="{isMealTime(currentHour, j) && i === currentDay ? 'highlight' : ''}" 
                contenteditable="true" 
                on:input = {(e) => updateValue(e, i, j)}>{m}
            </p>
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

    .highlight {
        color: var(--first-primary-accent-color);
        font-weight: bold;
    }
</style>