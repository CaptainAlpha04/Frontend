<script>
    import { onMount } from 'svelte';
    import ContentGrid from '../../uicomponents/content-grid.svelte';
    import TableRow from '../../uicomponents/tableRow.svelte';
    import Breadcrumb from '../../uicomponents/breadcrumb.svelte';

    let searchBox = "";
    let filterOptions = "display: none";
    let students = [];

    const displayFilterOptions = () => {
        filterOptions = filterOptions === "display: none" ? "display: block" : "display: none";
    }

    onMount(() => {
        searchAllStudent();
    });

    const searchAllStudent = async () => {
        const response = await fetch(`http://localhost:5000/daily_attendance/`);
        students = await response.json();
        console.log(students)
    }

    const searchStudentByQalam = async () => {
        const response = await fetch(`http://localhost:5000/daily_attendance/${searchBox}`);
        students = await response.json();
        console.log(students)
    }
</script>

<main>
    <h1>Search Student</h1>
    <Breadcrumb directoryPath={["Student Management", "Query Students"]} activeCrumb="Query Students" on:changePath/>

    <div class="settings-area">
        <div class="filter-area">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i class="fi fi-rr-settings-sliders filter" on:click={displayFilterOptions}></i>
            <div class="fitlerOptions" style={filterOptions}>
                <label for="hostel">Hostel</label>
                <select name="hostel" id="hostel" class="drop-down" on:change={searchAllStudent}>
                    <option value="Admin">Admin</option>
                    <option value="Zakarya">Zakarya</option>
                    <option value="Razi I">Razi I</option>
                    <option value="Razi II">Razi II</option>
                    <option value="Hajweri">Hajweri</option>
                    <option value="Maryam">Maryam</option>
                    <option value="Fatima">Fatima</option>
                    <option value="Ayesha">Ayesha</option>
                </select>
                <label for="degree">Degree</label>
                <select name="degree" id="degree" class="drop-down" on:change={searchAllStudent}>
                    <option value="BSCS">Undergraduate</option>
                    <option value="BSSE">Postgraduate</option>
                    <option value="BSEE">PhD</option>
                </select>
                <label for="batch">Batch</label>
                <select name="batch" id="batch" class="drop-down" on:change={searchAllStudent}>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                </select>
                <label for="Department">Department</label>
                <select name="Department" id="Department" class="drop-down" on:change={searchAllStudent}>
                    <option value="CS">CS</option>
                    <option value="SE">SE</option>
                    <option value="EE">EE</option>
                    <option value="CE">CE</option>
                    <option value="ME">ME</option>

                </select>
            </div>
        </div>
        <div class="search-area">
            <input type="text" placeholder="Enter Qalam ID" bind:value={searchBox}>
            <button on:click={searchStudentByQalam}>Search</button>
        </div>
    </div>
    <ContentGrid>
        {#each students as student}
            <TableRow studentName={student.Student_Name} QalamID={student.Qalam_Id} />
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

input[type="text"]{
    width: 20svw;
    height: 2.5svh;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: var(--input-background-color);
    color: inherit;
    border: none;
    border-bottom: 2px solid var(--first-primary-accent-color);

}

.settings-area {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    align-items: center;

}

.filter-area {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    flex-wrap: wrap;
}

.filter {
    font-size: 1.3rem;
    padding: 0.5rem;
    cursor: pointer;
}


.search-area {
    align-self: flex-end;
}
</style>