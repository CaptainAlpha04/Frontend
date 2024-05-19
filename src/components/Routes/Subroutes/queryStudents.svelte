<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import ContentGrid from '../../uicomponents/content-grid.svelte';
    import TableRow from '../../uicomponents/tableRow.svelte';
    import Breadcrumb from '../../uicomponents/breadcrumb.svelte';

    let dispatch = createEventDispatcher();
    let searchBox = "";
    let filterOptions = "display: none";
    $: students = [];

    const displayFilterOptions = () => {
        filterOptions = filterOptions === "display: none" ? "display: block" : "display: none";
    }

    onMount(() => {
        searchAllStudent();
    });

    const searchAllStudent = async () => {
        const response = await fetch(`http://localhost:5000/student/getAllStudents/`);
        students = await response.json();
        console.log()
    }

    const searchStudentByQalam = async () => {
        const response = await fetch(`http://localhost:5000/student/getStudent/${searchBox}`);
        if ((await response).status === 404 ) {
            students = []
        } else {
            students = await response.json();
        }
    }

    async function individualRecord(qalamId) {
        dispatch('changePath', { newPath: `student/${qalamId}` });
    }

    async function deleteAllStudents() {
        const response = await fetch(`http://localhost:5000/students/daily_attendance`, {
            method: 'DELETE',
            headers: {
            "Content-Type": 'application/json'
            }

        });
        students = [];
        console.log(students);
    }

    async function filterStudents() {
        const response = await fetch(`http://localhost:5000/student/filterStudents`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                hostel: document.getElementById('hostel').value,
                degree: document.getElementById('degree').value,
                department: document.getElementById('Department').value
            })
    });  
    students = await response.json();
    console.log(students)
}

</script>

<main>
    <h1>Search Student</h1>
    <div class="TopActions">
        <div class="breadcrumb">
    <Breadcrumb directoryPath={["Student Management", "Query Students"]} activeCrumb="Query Students" on:changePath/>
        </div> 
        <div class="deleteAllStudents">
            <p>Delete All Students</p>
            <button on:click = {deleteAllStudents}>
                <i class="fi fi-br-trash"></i>
            </button>
        </div>      
    </div>
    <div class="settings-area">
        <div class="filter-area">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i class="fi fi-rr-settings-sliders filter" on:click={displayFilterOptions}></i>
            <div class="fitlerOptions" style={filterOptions}>
                <label for="hostel">Hostel</label>
                <select name="hostel" id="hostel" class="drop-down" on:change={filterStudents}>
                    <option value="none">None</option>
                    <option value="Zakarya">Zakarya</option>
                    <option value="Razi I">Razi I</option>
                    <option value="Razi II">Razi II</option>
                    <option value="Hajweri">Hajweri</option>
                    <option value="Maryam">Maryam</option>
                    <option value="Fatima">Fatima</option>
                    <option value="Ayesha">Ayesha</option>
                </select>
                <label for="degree">Degree</label>
                <select name="degree" id="degree" class="drop-down" on:change={filterStudents}>
                    <option value="none">None</option>
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="PHD">PhD</option>
                </select>
                <label for="Department">Department</label>
                <select name="Department" id="Department" class="drop-down" on:change={filterStudents}>
                    <option value="none">None</option>
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
            <button on:click={searchStudentByQalam}>
                <i class="fi fi-br-search"></i>
            </button>
        </div>
    </div>
    <ContentGrid>
        {#if students.length === 0}
            <p>No Student Found</p>
        {:else}
        {#each students as student, i}
            <TableRow index={i+1} studentName={student.username} QalamID={student.qalamId} school={student.school} department={student.department} attendanceStatus on:click={() => {individualRecord(student.qalamId)}}/>
        {/each}
        {/if}
    </ContentGrid>
</main>

<style>
    
main{
    display: grid;
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
    align-content: center;

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

.TopActions {
    display: grid;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.breadcrumb {
    justify-self: flex-start;
}

.deleteAllStudents {
    display: flex;
    gap: 0.5rem;
    justify-self: flex-end;
}

</style>