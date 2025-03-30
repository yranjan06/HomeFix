export default{
    template:`
  <div class="my-5">
    <div v-if="currentJobs.length > 0" class="mb-5">
      <div class="mb-4">
        <h2 class="text-2xl fw-bold">Current Jobs</h2>
      </div>
      
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Package</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Pincode</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in currentJobs" :key="job.service_request_id">
              <td>{{ job.service_request_id }}</td>
              <td>{{ job.package_name }}</td>
              <td>{{ job.customer_name }}</td>
              <td>{{ job.phone }}</td>
              <td>{{ job.location }}</td>
              <td>{{ job.pincode }}</td>
              <td>{{ job.date_time }}</td>
              <td>
                <div v-if="job.status === 'Requested'" class="d-flex gap-2">
                  <button 
                    class="btn btn-primary" 
                    @click="$emit('accept', job.service_request_id)"
                  >
                    Accept
                  </button>
                  <button 
                    class="btn btn-danger" 
                    @click="$emit('reject', job.service_request_id)"
                  >
                    Reject
                  </button>
                </div>
                <button v-else class="btn btn-secondary" disabled>Assigned</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="completedJobs.length > 0" class="mb-5">
      <div class="mb-4">
        <h2 class="text-2xl fw-bold text-danger">Completed Jobs</h2>
      </div>
      
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Package</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Pincode</th>
              <th>Completion Date</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in completedJobs" :key="job.service_request_id">
              <td>{{ job.service_request_id }}</td>
              <td>{{ job.package_name }}</td>
              <td>{{ job.customer_name }}</td>
              <td>{{ job.phone }}</td>
              <td>{{ job.location }}</td>
              <td>{{ job.pincode }}</td>
              <td>{{ job.date_time }}</td>
              <td>
                <button 
                  v-if="job.status === 'Completed'" 
                  class="btn btn-primary"
                  @click="$emit('close', job.service_request_id)"
                >
                  CLOSE
                </button>
                <button v-else class="btn btn-secondary" disabled>Closed</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="jobs.length === 0" class="p-4 text-center">
      <p>No current jobs</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobsTable',
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  computed: {
    currentJobs() {
      return this.jobs.filter(job => job.status === 'Requested' || job.status === 'Accepted')
    },
    completedJobs() {
      return this.jobs.filter(job => job.status === 'Completed' || job.status === 'Closed')
    }
  }
}
</script>`

}