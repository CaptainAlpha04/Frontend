<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
  
    let chart;
  
    onMount(async () => {
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        const values = [65, 59, 80, 81, 56, 55, 40];
        
        const ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: values,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'My Second Dataset',
                    data: [10, 20, 30, 40, 100, 60, 70],
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            }
        });
    });
  </script>
  
  <canvas id="myChart" width="400" height="400"></canvas>
  
  <style>
    canvas {
      max-width: 100%;
      max-height: 100%;
    }
  </style>
  