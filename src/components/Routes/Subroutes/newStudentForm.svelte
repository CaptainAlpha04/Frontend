<script>
    import { prevent_default } from "svelte/internal";
    import Breadcrumb from "../../uicomponents/breadcrumb.svelte";
    import Card from "../../uicomponents/card.svelte";
    import ContentGrid from "../../uicomponents/content-grid.svelte";

    let cnic;
    let UploadedImage;
    let UserImage = "resources\\user-default.png";
    let buttonBool = false;

    // Function to handle image upload
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

    // Function to submit the form
    async function SubmitForm(e) {
        buttonBool = true;
        const student = {
            username: e.target[0].value + " " + e.target[1].value + " ",
            CNIC: e.target[2].value,
            phoneNumber: e.target[3].value,
            email: e.target[4].value,
            qalamId: e.target[7].value,
            school: e.target[8].value,
            department: e.target[9].value,
        };

        // Send request to the server
        const response = await fetch("http://localhost:5000/student/addNewStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });

        console.log(JSON.stringify(student));
    }

    // Function to check the length of CNIC input
    function checkLength(e) {
        cnic = e.target.value;
        if (cnic.length > 12 || !/^\d+$/.test(cnic)) {
            cnic = cnic.slice(0, 12);
        }
    }
</script>

<main>
    <h1>Register New Student</h1>
    <Breadcrumb directoryPath={["Student Management", "New Student"]} activeCrumb="New Student" />
    <form on:submit|preventDefault={SubmitForm}>
        <ContentGrid columnTemplate="8" rowTemplate="1">
            <Card columnSpan="5" rowSpan="2">
                <h3>Personal Information</h3>
                <div class="personal-info">
                    <label for="name">Name</label>
                    <input type="text" placeholder="First Name" required />
                    <input type="text" placeholder="Last Name" required />
                </div>
                <div class="personal-data">
                    <label for="CNIC">CNIC</label>
                    <input type="number" placeholder="00000-0000000-0" required on:keydown={checkLength} bind:value={cnic} />
                    <label for="DOB">Phone Number</label>
                    <input type="number" placeholder="xxxx-xxxxxxx" required />
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
            </Card>
            <Card columnSpan="3" rowSpan="2" class="pictureArea">
                <h3>Upload Picture</h3>
                <img src={UserImage} alt="Upload Image" class="upload-image" />
                <p>Note: The Image resolution should be less than 500 x 500 px. </p>
                <input type="file" bind:files={UploadedImage} class="ImageSelector" accept="image/*" />
                <button on:click={ImageUploadAction}>Upload</button>
            </Card>
            <Card columnSpan="3" rowSpan="2">
                <h3>Academic Information</h3>
                <label for="degree">NUST Roll Number</label>
                <input type="number" placeholder="Qalam ID" required />
                <label for="schools">School</label>
                <select name="schools" id="schools" class="drop-down" required>
                    <option value="ADMIN">Admin</option>
                    <option value="SEECS">SEECS</option>
                    <option value="ASAB">ASAB</option>
                    <option value="NICE">NICE</option>
                    <option value="NBS">NBS</option>
                </select>
                <label for="programs">Department</label>
                <select name="programs" id="programs" class="drop-down" required>
                    <option value="BSCS">BSCS</option>
                    <option value="BSSE">BSSE</option>
                    <option value="BSEE">BSEE</option>
                    <option value="BSME">BSME</option>
                    <option value="BSCE">BSCE</option>
                </select>
            </Card>
            <Card columnSpan="5" rowSpan="2">
                <h3>Hostel Details</h3>
                <label for="hostel">Hostel</label>
                <select name="hostel" id="hostel" class="drop-down" required>
                    <option value="Admin">Admin</option>
                    <option value="Zakarya">Zakarya</option>
                    <option value="Razi I">Razi I</option>
                    <option value="Razi II">Razi II</option>
                    <option value="Hajweri">Hajweri</option>
                    <option value="Maryam">Maryam</option>
                    <option value="Fatima">Fatima</option>
                    <option value="Ayesha">Ayesha</option>
                </select>
                <label for="room">Room Number</label>
                <input type="number" placeholder="Room Number" required />
            </Card>
            <button type="submit" disabled={buttonBool}>Submit</button>
        </ContentGrid>
    </form>
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
        grid-template-columns: repeat(3, 1fr);
    }

    .personal-data {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    input[type="text"],
    input[type="number"],
    input[type="email"] {
        padding: 0.5rem;
        margin: 0.5rem 0.2rem;
        border-radius: 0.5rem;
        border: none;
        background-color: var(--background-color);
    }

    .upload-image {
        border-radius: 50%;
        width: 6rem;
        height: 6rem;
        object-fit: cover;
    }

    .ImageSelector {}

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
</style>
