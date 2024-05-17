<script >
import Card from "../uicomponents/card.svelte";
import ContentGrid from "../uicomponents/content-grid.svelte";
import QueryStudent from "../Routes/Subroutes/queryStudents.svelte";
import NewStudentForm from "../Routes/Subroutes/newStudentForm.svelte";

let route = 1;

function changeRoute(newRoute) {
    console.log(newRoute);
    route = newRoute;
    
}

</script>

<main>
    {#if route === 0}
    <h1>Student Management</h1>
    <ContentGrid>
        <Card rowSpan = 3 columnSpan = 2>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h2 on:click = {() => changeRoute(1)}>
                Query Student Data
            </h2>
        </Card>
        <Card rowSpan = 3 columnSpan = 2>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <h2 on:click = {()=> changeRoute(2)}>
                Add New Student
            </h2>
        </Card>
    </ContentGrid>
{:else if route === 1} 
<QueryStudent on:changePath = {()=> changeRoute(0)}/>
{:else if route === 2} 
<NewStudentForm on:changePath = {()=> changeRoute(0)}/>
{/if}
    </main>

<style>
    main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    left: 6.7svw;
}
</style>