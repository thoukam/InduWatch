document.addEventListener('DOMContentLoaded', async () => {
    const heatmapContainer = document.getElementById('heatmap');
    const heatmapInstance = h337.create({
        container: heatmapContainer,
        maxOpacity: 0.6,
        radius: 50,
        blur: 0.9
    });

    // Fonction pour récupérer les données JSON
    async function fetchSensorData() {
        try {
            const response = await fetch('/dashboard/sensor-data/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Données des capteurs récupérées :', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données des capteurs :', error);
            return null;
        }
    }

    // Fonction pour générer les données pour la heatmap
    function generateHeatmapData(temp, humidity, pressure) {
        const points = [];
        const width = heatmapContainer.offsetWidth;
        const height = heatmapContainer.offsetHeight;

        // Ajouter les points correspondants aux valeurs des capteurs
        points.push({ x: Math.random() * width, y: Math.random() * height, value: temp });
        points.push({ x: Math.random() * width, y: Math.random() * height, value: humidity });
        points.push({ x: Math.random() * width, y: Math.random() * height, value: pressure });

        return { max: 100, data: points };
    }

    // Initialiser les graphiques Chart.js
    const lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: [], // Horodatage
            datasets: [
                { label: 'Température (°C)', data: [], borderColor: 'red', fill: false },
                { label: 'Humidité (%)', data: [], borderColor: 'blue', fill: false },
                { label: 'Pression (hPa)', data: [], borderColor: 'green', fill: false }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: true,
                    align: 'top',
                    color: '#000',
                    font: { weight: 'bold', size: 10 }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Temps' } },
                y: { title: { display: true, text: 'Valeurs' } }
            }
        },
        plugins: [ChartDataLabels]
    });

    const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Température', 'Humidité', 'Pression'],
            datasets: [{
                label: 'Valeurs actuelles',
                data: [0, 0, 0],
                backgroundColor: ['red', 'blue', 'green']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: true,
                    align: 'end',
                    color: '#fff',
                    font: { weight: 'bold', size: 12 }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    const radarChart = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: ['Température', 'Humidité', 'Pression'],
            datasets: [{
                label: 'Valeurs actuelles',
                data: [0, 0, 0],
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'blue'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: true,
                    color: '#000',
                    font: { size: 12, weight: 'bold' }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    const pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: ['Température', 'Humidité', 'Pression'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['red', 'blue', 'green']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    display: true,
                    formatter: (value) => value.toFixed(1), // Formatte les nombres
                    color: '#fff',
                    font: { size: 12, weight: 'bold' }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    // Mise à jour dynamique des graphiques et de la heatmap
    setInterval(async () => {
        const sensorData = await fetchSensorData(); // { temperature, humidity, pressure }
        if (sensorData) {
            const currentTime = new Date().toLocaleTimeString();

            // Mise à jour du graphique en ligne
            lineChart.data.labels.push(currentTime);
            lineChart.data.datasets[0].data.push(sensorData.temperature);
            lineChart.data.datasets[1].data.push(sensorData.humidity);
            lineChart.data.datasets[2].data.push(sensorData.pressure);
            if (lineChart.data.labels.length > 20) {
                lineChart.data.labels.shift();
                lineChart.data.datasets.forEach(dataset => dataset.data.shift());
            }
            lineChart.update();

            // Mise à jour de l'histogramme
            barChart.data.datasets[0].data = [
                sensorData.temperature,
                sensorData.humidity,
                sensorData.pressure
            ];
            barChart.update();

            // Mise à jour du radar chart
            radarChart.data.datasets[0].data = [
                sensorData.temperature,
                sensorData.humidity,
                sensorData.pressure
            ];
            radarChart.update();

            // Mise à jour du pie chart
            pieChart.data.datasets[0].data = [
                sensorData.temperature,
                sensorData.humidity,
                sensorData.pressure
            ];
            pieChart.update();

            // Mise à jour de la heatmap
            const heatmapData = generateHeatmapData(
                sensorData.temperature,
                sensorData.humidity,
                sensorData.pressure
            );
            heatmapInstance.setData(heatmapData);
        }
    }, 1000);
});
