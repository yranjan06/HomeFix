export default {
    template: `
    <div class="dashboard container-fluid p-3 bg-dark text-light">
        <div class="customer-welcome-card mt-2 ms-2 d-inline-block p-3 bg-dark border border-secondary rounded position-relative" style="left: -10px;">
            <h3 class="text-light mb-0">Customer Statistics</h3>
        </div>
        
        <div class="row g-3 mb-3 mt-4">
            <div class="col-md-3 col-6" v-for="(metric, index) in metrics" :key="index">
                <summary-metric :title="metric.title" :value="metric.value" :icon="metric.icon" :trend="metric.trend" />
            </div>
        </div>
        
        <div class="row g-3 mb-3">
            <div class="col-md-8">
                <summary-chart :monthly-usage="monthlyUsage" />
            </div>
            <div class="col-md-4">
                <summary-card title="Recent Activities" :items="activities" />
            </div>
        </div>
        
        <div class="row g-3">
            <div class="col-12">
                <summary-table :items="recentRequests" />
            </div>
        </div>
    </div>
    `,
    name: 'CustomerSummary',
    components: {
        'summary-metric': () => import('../components/Customer_Components/SummaryMetric.js'),
        'summary-chart': () => import('../components/Customer_Components/SummaryChart.js'),
        'summary-card': () => import('../components/Customer_Components/SummaryCard.js'),
        'summary-table': () => import('../components/Customer_Components/SummaryTable.js')
    },
    data() {
        return {
            metrics: [],
            activities: [],
            monthlyUsage: [],
            recentRequests: []
        }
    },
    mounted() {
        this.fetchSummaryData();
    },
    methods: {
        fetchSummaryData() {
            fetch('/api/customer-summary', {
                headers: {
                    'Authentication-Token': this.$store.state.auth_token
                }
            })
            .then(response => response.json())
            .then(data => {
                this.metrics = [
                    { title: 'Total Services', value: data.total_services.toString(), icon: 'users', trend: 'up' },
                    { title: 'Amount Spent', value: `$${data.amount_spent}`, icon: 'dollar-sign', trend: 'up' },
                    { title: 'Satisfaction', value: `${data.avg_satisfaction}/5`, icon: 'percent', trend: 'up' },
                    { title: 'Pending Services', value: data.pending_services.toString(), icon: 'activity', trend: 'down' }
                ];
                this.activities = data.recent_activities;
                this.monthlyUsage = data.monthly_usage;
                this.recentRequests = data.recent_requests;
            })
            .catch(error => console.error('Error fetching summary data:', error));
        }
    }
}
