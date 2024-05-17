<script >
    import ContentGrid from '../uicomponents/content-grid.svelte';
    import Card from '../uicomponents/card.svelte';
    import { onMount } from 'svelte';

    let videoSource = null;
    
    onMount(() => {
        allowCameraAccess();
    })

    const allowCameraAccess = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        });
        videoSource.srcObject = stream;
        videoSource.play();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<main>
    <h1>Security Management</h1>
    <ContentGrid columnTemplate = 5 rowTemplate = 4>
        <Card rowSpan = 4 columnSpan = 3>
            <div>
                <!-- svelte-ignore a11y-media-has-caption -->
                <video bind:this={videoSource} class="footage"/>
            </div>
        </Card>
        <Card rowSpan = 1 columnSpan = 2>
            <div>
                <h2>View Recorded Footages</h2>
                <p>View Footages recorded over the course of Time</p>
            </div>
        </Card>
        <Card rowSpan = 1 columnSpan = 2>
            <div>
                <h2>Report a Student</h2>
                <p>Report suspicious activites of a Student</p>
            </div>
        </Card>
        <Card rowSpan = 1 columnSpan = 2>
            <div>
                <h2>Challan History</h2>
                <p>View Challan History of Students</p>
            </div>
        </Card>
        <Card rowSpan = 1 columnSpan = 2>
            <div>
                <h2>All Cameras</h2>
                <p>View all Cameras in the Campus</p>
            </div>
        </Card>
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
    .footage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    -webkit-transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
    transform: scaleX(-1);
}

</style>