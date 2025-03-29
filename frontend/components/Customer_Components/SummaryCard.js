export default {
    template:`
  <div class="card">
    <div class="card-header">
      <h5 class="card-title mb-0">Projects Status</h5>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span :class="`badge bg-${getStatusColor(item.status)}`">{{ item.status }}</span>
              </td>
              <td>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" :style="`width: ${item.progress}%`" 
                       :aria-valuenow="item.progress" aria-valuemin="0" aria-valuemax="100">
                    {{ item.progress }}%
                  </div>
                </div>
              </td>
              <td>{{ item.owner }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryTable',
  props: {
    items: Array
  },
  methods: {
    getStatusColor(status) {
      switch(status) {
        case 'Active': return 'success';
        case 'Pending': return 'warning';
        case 'Completed': return 'info';
        case 'On Hold': return 'secondary';
        default: return 'primary';
      }
    }
  }
}
</script>`

}