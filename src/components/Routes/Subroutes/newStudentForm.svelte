<script>
    import Breadcrumb from "../../uicomponents/breadcrumb.svelte";
    import Card from "../../uicomponents/card.svelte";
    import ContentGrid from "../../uicomponents/content-grid.svelte";

    let cnic;
    let firstName;
    let lastName;
    let phoneNumber;
    let email;
    let qalamId;
    let school;
    let department;
    let hostel;
    let roomNum;

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
            username: firstName + " " + lastName,
            CNIC: cnic,
            phoneNumber,
            email,
            //image: UserImage,
            qalamId,
            school,
            department,
            hostelName: hostel,
            roomNumber: roomNum,
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
    <Breadcrumb directoryPath={["Student Management", "New Student"]} activeCrumb="New Student" on:changePath/>
    <form on:submit|preventDefault={SubmitForm}>
        <ContentGrid columnTemplate="8" rowTemplate="1">
            <Card columnSpan="5" rowSpan="2">
                <h3>Personal Information</h3>
                <div class="personal-info">
                    <label for="name">Name</label>
                    <input type="text" placeholder="First Name" bind:value = {firstName} required />
                    <input type="text" placeholder="Last Name" bind:value = {lastName} required />
                </div>
                <div class="personal-data">
                    <label for="CNIC">CNIC</label>
                    <input type="number" placeholder="00000-0000000-0" required on:keydown={checkLength} bind:value={cnic} />
                    <label for="DOB">Phone Number</label>
                    <input type="number" placeholder="xxxx-xxxxxxx" required bind:value = {phoneNumber}/>
                    <label for="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required bind:value = {email}/>
                </div>
            </Card>
            <Card columnSpan="3" rowSpan="2" class="pictureArea">
                <h3>Upload Picture</h3>
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img src={UserImage} alt="Upload Image" class="upload-image" />
                <p>Note: The Image resolution should be less than 500 x 500 px. </p>
                <input type="file" bind:files={UploadedImage} class="ImageSelector" accept="image/*" />
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class = "upload-btn" on:click={ImageUploadAction}>Upload</div>
            </Card>
            <Card columnSpan="3" rowSpan="2">
                <h3>Academic Information</h3>
                <label for="degree">NUST Roll Number</label>
                <input type="number" placeholder="Qalam ID" required bind:value = {qalamId}/>
                <label for="schools">School</label>
                <select name="schools" id="schools" class="drop-down" required bind:value = {school}>
                    <option value="ADMIN">Admin</option>
                    <option value="SEECS">SEECS</option>
                    <option value="ASAB">ASAB</option>
                    <option value="NICE">NICE</option>
                    <option value="NBS">NBS</option>
                </select>
                <label for="programs">Department</label>
                <select name="programs" id="programs" class="drop-down" required bind:value = {department}>
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
                <select name="hostel" id="hostel" class="drop-down" required bind:value = {hostel}>
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
                <input type="number" placeholder="Room Number" required bind:value = {roomNum}/>
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

    p {
        color: gray;
        font-size: 0.8rem;
    }

    .upload-btn {
        padding: 0.5rem;
        margin: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: var(--first-primary-accent-color);
        color: black;
        text-align: center;
        cursor: pointer;
    }
</style>
