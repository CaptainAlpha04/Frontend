<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    async function fetchHostelData() {
        
        const response = await fetch('http://localhost:5000/hostels/getHostelData');
        const data = await response.json();
        console.log(data)
        return data;
    }

    const colorPalette = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', 
        '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#1a55FF', '#55a2a2', 
        '#d4a017', '#2aaf78', '#d627d6', '#7f33ff'
    ];

    onMount(async () => {
        const data = await fetchHostelData();

        const labels = data.map(hostel => hostel.hostelName);
        const values = data.map(hostel => hostel.totalStudents);
        const backgroundColor = data.map((_, i) => colorPalette[i % colorPalette.length]);

        const ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },

                    title: {
                        display: true,
                        text: 'Hostel Information',
                        font: {
                            size: 20
                        },
                        position: 'top'
                    }
                }
            }
        });
    });
</script>
<canvas id="myChart" width="400" height="300"></canvas>

<style>
    canvas {
        max-width: 100%;
        max-height: 100%;
    }
</style>