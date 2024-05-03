<script>
    import { prevent_default } from "svelte/internal";
    import Breadcrumb from "../../uicomponents/breadcrumb.svelte";
    import Card from "../../uicomponents/card.svelte";
    import ContentGrid from "../../uicomponents/content-grid.svelte";

    let FingerprintID = Math.floor(Math.random() * 127);
    let UploadedImage;
    let UserImage = "resources\\user-default.png";
    let buttonBool  = false;
    const ImageUploadAction = () => {
        if (UploadedImage && UploadedImage.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                UserImage = event.target.result;
            };
            reader.readAsDataURL(UploadedImage[0]);
        }
        document.querySelector(".ImageSelector").value = "";
    };

    async function SubmitForm(e) {
        buttonBool = true;
        const student = {
            username: e.target[0].value + " " + e.target[1].value + " " + e.target[2].value,
            CNIC: e.target[3].value,
            phoneNumber: e.target[4].value,
            school: e.target[5].value,
            department: e.target[6].value,
            qalamId: e.target[7].value
            
        }

        // Send request to the server
        const response = await fetch("http://localhost:5000/student/addNewStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(student)
        });
            
        console.log(JSON.stringify(student));
    }   
</script>

<main>
    <h1>Register New Student</h1>
    <Breadcrumb directoryPath={["Student Management", "New Student"]} activeCrumb="New Student" />
    <ContentGrid columnTemplate="8" rowTemplate="1">
        <form on:submit|preventDefault={SubmitForm}>
        <Card columnSpan="5" rowSpan="2">
            <h3>Personal Information</h3>
            <div class="personal-info">
                <label for="name">Name</label>
                <input type="text" placeholder="First Name" required/>
                <input type="text" placeholder="Middle Name" required/>
                <input type="text" placeholder="Last Name" required/>
                <label for="CNIC">CNIC</label>
                <input type="Number" placeholder="00000-0000000-0" required/>
                <label for="DOB">Phone Number</label>
                <input type="Number" placeholder="xxxx-xxxxxxx" required/>
            </div>
        </Card>
        <!-- <Card columnSpan="3" rowSpan="2" class="pictureArea">
            <h3>Upload Picture</h3>
            <img src={UserImage} alt="Upload Image" class="upload-image" />
            <p>Note: The Image resolution should be less than 500 x 500 px. </p>
            <input type="file" bind:files={UploadedImage} class="ImageSelector" accept="image/*" />
            <button on:click={ImageUploadAction}>Upload</button>
        </Card> -->
        <Card columnSpan="5" rowSpan="2">
            <h3>Academic Information</h3>
            <label for="schools">Choose your School</label>
            <select name="schools" id="schools" class="drop-down" required>
                <option value="ADMIN">Admin</option>
                <option value="SEECS">SEECS</option>
                <option value="ASAB">ASAB</option>
                <option value="NICE">NICE</option>
                <option value="NBS">NBS</option>
            </select>
            <label for="programs">Choose your Department</label>
            <select name="programs" id="programs" class="drop-down" required>
                <option value="BSCS">BSCS</option>
                <option value="BSSE">BSSE</option>
                <option value="BSEE">BSEE</option>
                <option value="BSME">BSME</option>
                <option value="BSCE">BSCE</option>
            </select>
            <label for="degree">NUST Roll Number</label>
            <input type="Number" placeholder="Qalam ID" required/>
            <label for="fingerprint">Fingerprint ID</label>
            <input type="Number" bind:value={FingerprintID} readonly required>
        </Card>
        <Card>
            <button type="submit" disabled = {buttonBool}>Submit</button>
        </Card>
    </form>
    </ContentGrid>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        left: 6.7svw;
    }

    .personal-info {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    input[type="text"] {
        padding: 0.5rem;
        margin: 0.5rem 0.2rem;
        border-radius: 0.5rem;
        border: none;
        background-color: var(--background-color)
    }

    .upload-image {
        border-radius: 50%;
        width: 6rem;
        height: 6rem;
        object-fit: cover;
    }

    .ImageSelector {
    }

    p {
        color: gray;
        font-size: 0.8rem;
    }

    .drop-down {
        padding: 0.5rem;
        margin: 0.5rem 0.2rem;
        border-radius: 0.5rem;
    }
    label {
        margin: 0.5rem 1rem;
    }

    input[type="Number"] {
        padding: 0.5rem;
        margin: 0.5rem 0.2rem;
        border-radius: 0.5rem;
        border: none;
        background-color: var(--background-color);
    }
</style>
