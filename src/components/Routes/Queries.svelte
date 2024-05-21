<script >
    import ContentGrid from '../uicomponents/content-grid.svelte';
    import Card from '../uicomponents/card.svelte';
  import { onMount } from 'svelte';

    let complaint = [];
    let query = [];
    let queryResponse = [];

    onMount(()=>{
        getComplains();
        getQuery();
    })

    async function getComplains() {
        const response = await fetch(`http://localhost:5000/complaints/getAllComplaints`);
        complaint = await response.json();
    }

    async function getQuery() {
        const response = await fetch(`http://localhost:5000/queries/getAllQueries`);
        query = await response.json();
    }

    async function resolveComplaint(title) {
        try {
            const response = await fetch(`http://localhost:5000/complaints/resolveComplaint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        });
            if((await response).status === 200) {
                getComplains();
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function submitQueryResponse(title, i) {
        console.log("button")
        try {
            const response = await fetch(`http://localhost:5000/queries/queryRespond`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, queryResponse: queryResponse[i]})
        });
            if((await response).status === 200) {
                getQuery();
                queryResponse = [];
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>

<main>
    <h1>Complains & Queries</h1>
    <ContentGrid columnTemplate = 2 rowTemplate = 6>
        <div class="Complaints">
            <h2>Complaints</h2>
            {#each complaint as c}
            <Card>
                <div class= "card-Component">
                    <h2>{c.title}</h2>
                    <button on:click={() => {resolveComplaint(c.title)}}><i class="fi fi-br-check"></i></button>
                </div>
                <p>{c.description}</p>
            </Card>
            <p></p>
            {/each}
        </div>
        <div class="Queries">
            <h2>Queries</h2>
            {#each query as q, i}
            <Card>
                <div class= "card-Component">
                    <h2>{q.title}</h2>
                    
                </div>
                <p>{q.description}</p>
                <div class="response">
                    <form class = "queryForm" on:submit|preventDefault = {() => {submitQueryResponse(q.title, i)}}>
                    <input type="text" placeholder="Enter your response here" bind:value = {queryResponse[i]} required>
                    <button type="submit"
                    style = {"background-Color: var(--first-primary-accent-color); color: black;"}
                    ><i class="fi fi-br-paper-plane-top"></i></button>
                    </form>
                </div>
            </Card>
            <p></p>
            {/each}
        </div>
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

    .Complaints {
        column-span: 1;
        padding: 1rem;
    }

    .Queries {
        column-span: 1;
    }

    .card-Component {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    button {
        background-color: #4CAF50;
        color: white;
    }


    .queryForm {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    
    input[type="text"]{
    width: 20svw;
    height: 2.5svh;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: var(--input-background-color);
    color: inherit;
    border: none;
    border-bottom: 2px solid var(--first-primary-accent-color);
    width: 85%;

    }
</style>