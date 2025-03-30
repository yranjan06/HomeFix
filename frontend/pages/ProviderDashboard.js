export default {
    template:`
  <div class="container mx-auto px-4 py-5">
    <div class="mb-5">
      <h1 class="display-5 text-secondary font-pacifico">
        Welcome {{ user.username }}
      </h1>
    </div>

    <FlashMessage 
      v-for="(message, index) in flashMessages" 
      :key="index" 
      :type="message.type" 
      :message="message.message" 
    />

    <JobsTable 
      :jobs="jobs"
      @accept="handleAcceptJob"
      @reject="handleRejectJob"
      @close="handleCloseJob"
    />

    <PackagesTable 
      :packages="packages"
      @delete="handleDeletePackage"
      @update="handleUpdatePackage"
      @create-new="handleCreateNewPackage"
    />

    <ReviewsSection :reviews="reviews" />

    <CreatePackageModal
      :show="isPackageModalOpen"
      @close="isPackageModalOpen = false"
      @save="handleSavePackage"
      :initial-data="currentPackage"
      :is-update="isUpdateMode"
    />
  </div>
</template>

<script>
import FlashMessage from './FlashMessage.vue'
import JobsTable from './JobsTable.vue'
import PackagesTable from './PackagesTable.vue'
import ReviewsSection from './ReviewsSection.vue'
import CreatePackageModal from './CreatePackageModal.vue'

export default {
  name: 'Dashboard',
  components: {
    FlashMessage,
    JobsTable,
    PackagesTable,
    ReviewsSection,
    CreatePackageModal
  },
  data() {
    return {
      user: {
        username: 'ServicePro'
      },
      packages: [
        {
          package_id: 1,
          name: 'Basic Cleaning',
          price: 75,
          description: 'General house cleaning (2 bedrooms, 1 bathroom)',
          duration: '2 hours'
        },
        {
          package_id: 2,
          name: 'Deep Cleaning',
          price: 150,
          description: 'Thorough deep clean of entire home including appliances',
          duration: '4 hours'
        },
        {
          package_id: 3,
          name: 'Move-out Cleaning',
          price: 200,
          description: 'Complete cleaning for moving out of property',
          duration: '5 hours'
        }
      ],
      jobs: [
        {
          service_request_id: 101,
          package_name: 'Basic Cleaning',
          customer_name: 'John Doe',
          phone: '555-123-4567',
          location: '123 Main St, Apt 4B',
          pincode: '12345',
          date_time: '2023-07-15 10:00 AM',
          status: 'Requested'
        },
        {
          service_request_id: 102,
          package_name: 'Deep Cleaning',
          customer_name: 'Jane Smith',
          phone: '555-987-6543',
          location: '456 Oak Ave',
          pincode: '54321',
          date_time: '2023-07-16 1:00 PM',
          status: 'Accepted'
        },
        {
          service_request_id: 103,
          package_name: 'Move-out Cleaning',
          customer_name: 'Robert Johnson',
          phone: '555-456-7890',
          location: '789 Pine St',
          pincode: '67890',
          date_time: '2023-07-10 11:30 AM',
          status: 'Completed'
        },
        {
          service_request_id: 104,
          package_name: 'Basic Cleaning',
          customer_name: 'Sarah Williams',
          phone: '555-246-8135',
          location: '321 Elm St',
          pincode: '13579',
          date_time: '2023-07-05 9:00 AM',
          status: 'Closed'
        }
      ],
      reviews: [
        {
          service_id: 104,
          customer_name: 'Sarah Williams',
          rating: 5,
          comment: 'Amazing service! The cleaner was professional and thorough. Would definitely book again.'
        },
        {
          service_id: 98,
          customer_name: 'Michael Brown',
          rating: 4,
          comment: 'Very good cleaning service. Arrived on time and did a great job.'
        },
        {
          service_id: 87,
          customer_name: 'Emily Davis',
          rating: 5,
          comment: 'Fantastic service! My apartment has never looked cleaner.'
        }
      ],
      flashMessages: [],
      isPackageModalOpen: false,
      isUpdateMode: false,
      currentPackage: undefined
    }
  },
  methods: {
    addFlashMessage(type, message) {
      this.flashMessages.push({ type, message })
      setTimeout(() => {
        this.flashMessages = this.flashMessages.filter(msg => msg.message !== message)
      }, 5000)
    },
    handleAcceptJob(id) {
      this.jobs = this.jobs.map(job => 
        job.service_request_id === id ? { ...job, status: 'Accepted' } : job
      )
      this.addFlashMessage('success', `Job #${id} has been accepted.`)
    },
    handleRejectJob(id) {
      this.jobs = this.jobs.map(job => 
        job.service_request_id === id ? { ...job, status: 'Rejected' } : job
      )
      this.addFlashMessage('info', `Job #${id} has been rejected.`)
    },
    handleCloseJob(id) {
      this.jobs = this.jobs.map(job => 
        job.service_request_id === id ? { ...job, status: 'Closed' } : job
      )
      this.addFlashMessage('success', `Job #${id} has been closed.`)
    },
    handleDeletePackage(id) {
      this.packages = this.packages.filter(pkg => pkg.package_id !== id)
      this.addFlashMessage('info', `Package #${id} has been deleted.`)
    },
    handleUpdatePackage(id) {
      const packageToUpdate = this.packages.find(pkg => pkg.package_id === id)
      if (packageToUpdate) {
        this.currentPackage = packageToUpdate
        this.isUpdateMode = true
        this.isPackageModalOpen = true
      }
    },
    handleCreateNewPackage() {
      this.currentPackage = undefined
      this.isUpdateMode = false
      this.isPackageModalOpen = true
    },
    handleSavePackage(packageData) {
      if (this.isUpdateMode && this.currentPackage) {
        // Update existing package
        this.packages = this.packages.map(pkg => 
          pkg.package_id === this.currentPackage.package_id 
            ? { ...pkg, ...packageData } 
            : pkg
        )
        this.addFlashMessage('success', `Package "${packageData.name}" has been updated.`)
      } else {
        // Create new package
        const newPackage = {
          package_id: Math.max(0, ...this.packages.map(pkg => pkg.package_id)) + 1,
          ...packageData
        }
        this.packages.push(newPackage)
        this.addFlashMessage('success', `Package "${packageData.name}" has been created.`)
      }
    }
  }
}
</script>

<style>
.font-pacifico {
  font-family: 'Pacifico', cursive;
}
</style>`

}
