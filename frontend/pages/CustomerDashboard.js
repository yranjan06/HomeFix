import NameCard from '../components/NameCard.js';
import ServiceCard from '../components/Customer_Components/ServiceCard.js';
import ServiceHistory from '../components/Customer_Components/ServiceHistory.js';

export default {
  components: {
    NameCard,
    ServiceCard,
    ServiceHistory
  },
  data() {
    return {
      services: [],
      loading: true,
      error: null
    };
  },
  computed: {
    username() {
      return this.$store.getters.currentUser ? this.$store.getters.currentUser.username : 'Guest';
    }
  },
  methods: {
    async fetchServices() {
      try {
        const response = await fetch('/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        
        const data = await response.json();
        this.services = data.map(service => ({
          id: service.id,
          name: service.name,
          isActive: true
        }));
        this.loading = false;
      } catch (error) {
        console.error('Error fetching services:', error);
        this.error = error.message;
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchServices();
  },
  template: `
    <div class="container mt-4">
      <!-- User Name Card -->
      <NameCard :username="username" />

      <!-- Loading indicator -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-white">Loading services...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <!-- Service Grid -->
      <div v-else class="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :id="service.id"
          :name="service.name"
          :isActive="service.isActive"
        />
      </div>
      
      <!-- Service History Section -->
      <ServiceHistory />
    </div>
  `
};
