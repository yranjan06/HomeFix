// import { ref, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
// import ServiceDetails from '../components/ServiceDetails';

// export default {
//   name: 'ServicePage',
//   components: {
//     ServiceDetails
//   },
//   setup() {
//     const route = useRoute();
//     const service = ref(null);

//     const fetchServiceDetails = async (serviceId) => {
//       // Simulated API call
//       service.value = {
//         id: serviceId,
//         name: 'Plumbing',
//         items: [
//           { id: 'P1', name: 'Pipe Repair', description: 'Fix leaky pipes', price: 500, provider: 'John Doe', rating: 4.5, reviews: 120 },
//           { id: 'P2', name: 'Sink Installation', description: 'Install new sink', price: 1000, provider: 'Jane Smith', rating: 4.8, reviews: 95 },
//           // Add more service items as needed
//         ]
//       };
//     };

//     onMounted(() => {
//       const serviceId = route.params.id;
//       fetchServiceDetails(serviceId);
//     });

//     return {
//       service
//     };
//   },
//   template: `
//     <div class="container mx-auto px-4 py-8">
//       <h1 class="text-3xl font-bold mb-8">{{ service?.name }} Services</h1>
//       <ServiceDetails :service="service" />
//     </div>
//   `
// };




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
            <i class="fas fa-arrow-left me-2"></i> Back to Services
          </router-link>
        </div>
        
        <h1 class="display-5 fw-bold mb-4">{{ service?.name }} Services</h1>
        <ServiceDetails :service="service" />
      </div>
    </div>
  `
};
