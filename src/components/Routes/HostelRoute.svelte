<script >
    import ContentGrid from '../uicomponents/content-grid.svelte';
    import Card from '../uicomponents/card.svelte';

    const hostels = [
        {
            name: 'Attar',
        },
        {
            name: 'Zikarya',
        },
        {
            name: 'Fatima',
        },
        {
            name: 'Aisha',
        },
        {
            name: 'Razi I',
        },
        {
            name: 'Razi II',
        },
        {
            name: 'Maryam',
        },
        {
            name: 'Amna',
        },
        {
            name: 'Ghazali',
        },
        {
            name: 'Hostel 2',
        },
        {
            name: 'Hostel 3',
        },
        {
            name: 'Hostel 4',
        },
    ]
</script>

<main>
    <h1>Hostel Management</h1>
    <ContentGrid columnTemplate = 4 rowTemplate = 8>
        <Card rowSpan = 2 columnSpan = 2>
            <h2>Manage Records</h2>
        </Card>
        <Card rowSpan = 2 columnSpan = 2>
            <h2>Manage Resources</h2>
        </Card>
        {#each hostels as h}
        <Card rowSpan = 1 columnSpan = 1>
            <h3>{h.name}</h3>
        </Card>
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
</style>