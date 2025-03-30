

export default {
    template: `
    <div class="card h-100 bg-dark border border-secondary rounded">
        <div class="card-body">
            <h5 class="card-title text-light">Performance Overview</h5>
            <canvas ref="canvas" height="200"></canvas>
        </div>
    </div>
    `,
    name: 'SummaryChart',
    props: {
        monthlyUsage: Array
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.canvas.getContext('2d');
            
            import('chart.js').then(Chart => {
                if (this.chart) {
                    this.chart.destroy();
                }
                
                const labels = this.monthlyUsage.map(item => item.month);
                const data = this.monthlyUsage.map(item => item.count);
                
                this.chart = new Chart.default(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Services Used',
                            data: data,
                            backgroundColor: 'rgba(71, 183, 132, 0.5)',
                            borderColor: 'rgba(71, 183, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Services',
                                    color: '#ffffff'
                                },
                                ticks: {
                                    color: '#ffffff'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Month',
                                    color: '#ffffff'
                                },
                                ticks: {
                                    color: '#ffffff'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    }
                });
            });
        }
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        monthlyUsage: {
            handler() {
                this.$nextTick(() => {
                    this.renderChart();
                });
            },
            deep: true
        }
    }
}
