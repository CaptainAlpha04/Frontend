<script >
  import ContentGrid from "../uicomponents/content-grid.svelte";

  let cardsProperties = [
    { columnSpan: 1, rowSpan: 2 },
    { columnSpan: 1, rowSpan: 2 },
    { columnSpan: 1, rowSpan: 3 },
    { columnSpan: 1, rowSpan: 1 },
    { columnSpan: 1, rowSpan: 1 },
  ];
</script>

<main>
<h1>Dashboard</h1>
<ContentGrid {cardsProperties}/>
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