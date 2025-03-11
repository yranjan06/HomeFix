export default {
    template: `
    <div class="container my-5">
        <h1 class="text-center mb-5">Our Services</h1>
        
        <div class="row mb-4">
            <div class="col-md-6 offset-md-3">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search services..." v-model="searchQuery">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button">Search</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mb-4">
            <div class="col-md-12">
                <div class="btn-group" role="group">
                    <button type="button" class="btn" 
                            :class="selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'"
                            @click="selectedCategory = ''">
                        All
                    </button>
                    <button type="button" class="btn" 
                            :class="selectedCategory === 'normal' ? 'btn-primary' : 'btn-outline-primary'"
                            @click="selectedCategory = 'normal'">
                        Normal
                    </button>
                    <button type="button" class="btn" 
                            :class="selectedCategory === 'emergency' ? 'btn-primary' : 'btn-outline-primary'"
                            @click="selectedCategory = 'emergency'">
                        Emergency
                    </button>
                    <button type="button" class="btn" 
                            :class="selectedCategory === 'platinum' ? 'btn-primary' : 'btn-outline-primary'"
                            @click="selectedCategory = 'platinum'">
                        Premium
                    </button>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div v-for="service in filteredServices" :key="service.id" class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">{{ service.name }}</h5>
                        <p class="card-text">{{ service.description }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-primary font-weight-bold">From ₹{{ service.base_price }}</span>
                            <span class="badge" :class="getCategoryBadgeClass(service.category)">
                                {{ getCategoryDisplayName(service.category) }}
                            </span>
                        </div>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <router-link :to="'/services/' + service.id" class="btn btn-primary btn-block">
                            View Providers
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="filteredServices.length === 0" class="text-center py-5">
            <p class="text-muted">No services found matching your criteria.</p>
        </div>
    </div>
    `,
    data() {
        return {
            services: [],
            searchQuery: '',
            selectedCategory: '',
            loading: false
        }
    },
    computed: {
        filteredServices() {
            return this.services.filter(service => {
                const matchesSearch = service.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                     service.description.toLowerCase().includes(this.searchQuery.toLowerCase());
                
                const matchesCategory = this.selectedCategory === '' || service.category === this.selectedCategory;
                
                return matchesSearch && matchesCategory;
            });
        }
    },
    mounted() {
        this.fetchServices();
    },
    methods: {
        async fetchServices() {
            this.loading = true;
            try {
                const response = await fetch('/services');
                if (response.ok) {
                    this.services = await response.json();
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                this.loading = false;
            }
        },
        getCategoryBadgeClass(category) {
            switch(category) {
                case 'emergency':
                    return 'badge-danger';
                case 'platinum':
                    return 'badge-info';
                default:
                    return 'badge-success';
            }
        },
        getCategoryDisplayName(category) {
            switch(category) {
                case 'emergency':
                    return 'Emergency';
                case 'platinum':
                    return 'Premium';
                default:
                    return 'Standard';
            }
        }
    }
}