export default {
    template:`
  <div class="my-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-2xl fw-bold">Current Packages</h2>
      <button 
        class="btn btn-primary d-flex align-items-center gap-2"
        @click="$emit('create-new')"
      >
        <i class="bi bi-plus-circle"></i>
        <span>New Package</span>
      </button>
    </div>

    <div v-if="packages.length > 0" class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pkg in packages" :key="pkg.package_id">
            <td>{{ pkg.package_id }}</td>
            <td>{{ pkg.name }}</td>
            <td>${{ pkg.price }}</td>
            <td>{{ pkg.description }}</td>
            <td>{{ pkg.duration }}</td>
            <td class="d-flex gap-2">
              <button 
                class="btn btn-danger" 
                @click="handleDelete(pkg.package_id)"
              >
                Delete
              </button>
              <button 
                class="btn btn-primary"
                @click="$emit('update', pkg.package_id)"
              >
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else class="p-4 bg-light rounded text-center">
      <p>No packages found. Create a new package to get started.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackagesTable',
  props: {
    packages: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDelete(id) {
      if (confirm('Are you sure you want to delete this package?')) {
        this.$emit('delete', id)
      }
    }
  }
}
</script>`

}