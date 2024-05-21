<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    async function fetchStudentData() {
        
        const response = await fetch('http://localhost:5000/hostels/getStudentDistribution');
        const data = await response.json();
        console.log(data)
        return data;
    }

    const colorPalette = [ 
    '#1a55FF', '#55a2a2', '#d62728', '#e377c2', '#d4a017', '#2aaf78', '#d627d6', '#7f33ff', '#1f77b4', '#ff7f0e',
    '#2ca02c', '#9467bd', '#8c564b', '#7f7f7f', '#bcbd22', '#17becf',
    ];

    onMount(async () => {
        const data = await fetchStudentData();

        const labels = data.map(student => student._id);
        const values = data.map(student => student.totalStudents);
        const backgroundColor = data.map((_, i) => colorPalette[i % colorPalette.length]);

        const ctx = document.getElementById('barChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
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
                        position: 'bottom',
                        display: false
                    },

                    title: {
                        text: 'School Distribution in Hostels',
                        display: true,
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
<canvas id="barChart" width="300" height="300"></canvas>

<style>
    canvas {
        max-width: 100%;
        max-height: 100%;
    }
</style>