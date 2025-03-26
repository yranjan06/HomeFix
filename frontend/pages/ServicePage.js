import ServiceDetails from '../components/Customer_Components/ServiceDetails.js';

export default {
  name: 'ServicePage',
  components: {
    ServiceDetails
  },
  data() {
    return {
      service: null,
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchServiceDetails(serviceId) {
      try {
        this.loading = true;
        const response = await fetch(`/service-packages?service_id=${serviceId}`);
        if (!response.ok) throw new Error('Failed to fetch service details');
        
        const packages = await response.json();
        if (packages.length === 0) {
          throw new Error('No service packages available');
        }
        
        // Get service name from the first package
        const serviceName = packages[0].service_name;
        
        this.service = {
          id: serviceId,
          name: serviceName,
          items: packages.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            provider: pkg.professional_name || 'Available Provider',
            rating: 4.5, // Default or from API
            reviews: 10,  // Default or from API
            experience: '3+ yrs xp' // Default or from API
          }))
        };
        this.loading = false;
      } catch (err) {
        this.error = err.message || "Failed to load service details";
        this.loading = false;
        console.error(err);
      }
    }
  },
  mounted() {
    const serviceId = this.$route.params.id;
    this.fetchServiceDetails(serviceId);
  },
  template: `
    <div class="container mt-4 text-white">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading service details...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <div v-else>
        <div class="mb-4">
          <router-link to="/customer-dashboard" class="text-light">
            <div class="back-link-box d-inline-block p-2 bg-dark border border-secondary rounded">
              <a href="/customer-dashboard" class="text-light text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-2" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                Back to Home
              </a>
            </div>
          </router-link>
        </div>
        
        <h1 class="display-5 fw-bold mb-4">{{ service?.name }} Services</h1>
        <ServiceDetails :service="service" />
      </div>
    </div>
  `
};
