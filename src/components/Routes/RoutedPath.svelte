<script>
import ContentGrid from "../uicomponents/content-grid.svelte";
import BreadCrumb from "../uicomponents/breadcrumb.svelte";

export let PageTitle = document.title;
export let directoryPath = [];
$:ActiveCrumb = PageTitle;

</script>

<main>
    <h1>{PageTitle}</h1>
    <BreadCrumb />
    <ContentGrid>
        
    </ContentGrid>
</main>

<style>

</style>