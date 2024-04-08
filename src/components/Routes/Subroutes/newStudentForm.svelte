<script>
import { prevent_default } from "svelte/internal";
import Breadcrumb from "../../uicomponents/breadcrumb.svelte";
import BreadCrumb from "../../uicomponents/breadcrumb.svelte";
import Card from "../../uicomponents/card.svelte";
import ContentGrid from "../../uicomponents/content-grid.svelte";

let UploadedImage;
let UserImage = "resources\\user-default.png";

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
</script>

<main>
    <h1>Register New Student</h1>
    <Breadcrumb directoryPath={["Student Management", "New Student"]} activeCrumb = "New Student"/>
    <ContentGrid columnTemplate = 8 rowTemplate = 1>
        <Card columnSpan = 5 rowSpan = 2>
            <h3>Personal Information</h3>
            <div class="personal-info">
                <h4>Name</h4>
                <input type="text" placeholder="First Name">
                <input type="text" placeholder="Middle Name">
                <input type="text" placeholder="Last Name">
                <h4>CNIC</h4>
                    <input type="Number" placeholder="00000-0000000-0"> 
                </div>
        </Card>
        <Card columnSpan = 3 rowSpan = 2 class="pictureArea">
            <h3>Upload Picture</h3>
            <img src={UserImage} alt="Upload Image" class="upload-image">
            <p>Note: The Image resolution should be less than 500 x 500 px. </p>
            <input type="file" bind:files={UploadedImage} class="ImageSelector" accept="image/*">
            <button on:click={ImageUploadAction}>Upload</button>
        </Card>
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

</style>