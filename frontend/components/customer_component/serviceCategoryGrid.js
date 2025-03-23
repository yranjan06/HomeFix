export default {
    template: `
    <div class="service-grid my-4">
        <div class="row g-3">
            <div 
                v-for="service in services" 
                :key="service.id" 
                class="col-6 col-md-4 col-lg-2"
            >
                <service-category-card 
                    :serviceName="service.name" 
                    :serviceId="service.id" 
                />
            </div>
        </div>
    </div>
    `,
    components: {
        'service-category-card': () => import('./serviceCategoryCard.js')
    },
    data() {
        return {
            services: []
        }
    },
    mounted() {
        this.fetchServices();
    },
    methods: {
        async fetchServices() {
            try {
                const response = await fetch('/api/services');
                if (response.ok) {
                    this.services = await response.json();
                } else {
                    console.error('Failed to fetch services');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }
    }
}
