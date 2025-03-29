export default {
    template:`
  <div class="dashboard container-fluid py-4">
    <h1 class="mb-4">QWIX Summary Dashboard</h1>
    
    <div class="row mb-4">
      <div class="col-md-3" v-for="(metric, index) in metrics" :key="index">
        <summary-metric :title="metric.title" :value="metric.value" :icon="metric.icon" :trend="metric.trend" />
      </div>
    </div>
    
    <div class="row mb-4">
      <div class="col-md-8">
        <summary-chart :chart-data="chartData" />
      </div>
      <div class="col-md-4">
        <summary-card title="Recent Activities" :items="activities" />
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <summary-table :items="tableData" />
      </div>
    </div>
  </div>
</template>

<script>
import SummaryMetric from '@/components/SummaryMetric.vue'
import SummaryChart from '@/components/SummaryChart.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import SummaryTable from '@/components/SummaryTable.vue'

export default {
  name: 'Dashboard',
  components: {
    SummaryMetric,
    SummaryChart,
    SummaryCard,
    SummaryTable
  },
  data() {
    return {
      metrics: [
        { title: 'Total Users', value: '2,845', icon: 'users', trend: 'up' },
        { title: 'Revenue', value: '$12,350', icon: 'dollar-sign', trend: 'up' },
        { title: 'Conversion', value: '3.2%', icon: 'percent', trend: 'down' },
        { title: 'Active Sessions', value: '156', icon: 'activity', trend: 'up' }
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users',
            backgroundColor: 'rgba(71, 183, 132, 0.5)',
            data: [40, 39, 60, 75, 82, 95]
          },
          {
            label: 'Revenue',
            backgroundColor: 'rgba(114, 124, 245, 0.5)',
            data: [20, 25, 30, 35, 43, 50]
          }
        ]
      },
      activities: [
        { text: 'John updated dashboard', time: '5 min ago' },
        { text: 'New user registered', time: '1 hour ago' },
        { text: 'Server update completed', time: '2 hours ago' },
        { text: 'Database backup created', time: '5 hours ago' },
        { text: 'Weekly report generated', time: '1 day ago' }
      ],
      tableData: [
        { id: 1, name: 'Project Alpha', status: 'Active', progress: 75, owner: 'John Doe' },
        { id: 2, name: 'Project Beta', status: 'Pending', progress: 30, owner: 'Jane Smith' },
        { id: 3, name: 'Project Gamma', status: 'Completed', progress: 100, owner: 'Mike Johnson' },
        { id: 4, name: 'Project Delta', status: 'Active', progress: 45, owner: 'Sarah Williams' },
        { id: 5, name: 'Project Epsilon', status: 'On Hold', progress: 60, owner: 'David Brown' }
      ]
    }
  }
}
</script>

    `
}
