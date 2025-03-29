export default{
    template:`
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">Performance Overview</h5>
      <bar-chart :chart-data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'SummaryChart',
  components: {
    BarChart: {
      extends: Bar,
      props: ['chartData', 'options'],
      mounted() {
        this.renderChart(this.chartData, this.options)
      }
    }
  },
  props: {
    chartData: Object
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>`

}