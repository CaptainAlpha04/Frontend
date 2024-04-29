<script >
import ContentGrid from '../uicomponents/content-grid.svelte';
import TableRow from '../uicomponents/tableRow.svelte';  

let studentName = "Saad Khan";
let QalamID = 455280;
let searchBox = "";

const searchStudent = async () => {
    const response = await fetch(`http://localhost:5000/daily_attendance/${searchBox}`)
    const responseData = await response.json();

    studentName = responseData[0].Student_Name;
    QalamID = responseData[0].Qalam_Id;
    console.log(studentName);
}
</script>

<main>
    <h1>Student Management</h1>
    <input type="text" placeholder="Enter Qalam ID" bind:value = {searchBox}>
    <button on:click={searchStudent}>Search</button>
    <ContentGrid>
    <TableRow {studentName} {QalamID}></TableRow>
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
</style>