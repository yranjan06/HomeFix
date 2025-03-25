import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ServiceDetails from '../components/ServiceDetails';

export default {
  name: 'ServicePage',
  components: {
    ServiceDetails
  },
  setup() {
    const route = useRoute();
    const service = ref(null);

    const fetchServiceDetails = async (serviceId) => {
      // Simulated API call
      service.value = {
        id: serviceId,
        name: 'Plumbing',
        items: [
          { id: 'P1', name: 'Pipe Repair', description: 'Fix leaky pipes', price: 500, provider: 'John Doe', rating: 4.5, reviews: 120 },
          { id: 'P2', name: 'Sink Installation', description: 'Install new sink', price: 1000, provider: 'Jane Smith', rating: 4.8, reviews: 95 },
          // Add more service items as needed
        ]
      };
    };

    onMounted(() => {
      const serviceId = route.params.id;
      fetchServiceDetails(serviceId);
    });

    return {
      service
    };
  },
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">{{ service?.name }} Services</h1>
      <ServiceDetails :service="service" />
    </div>
  `
};
