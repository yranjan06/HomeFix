export default {
    props: ['searchQuery', 'location', 'filters'],
    template: `
    <div class="search-bar card mb-4 bg-dark text-light w-75 mx-auto border border-2 border-secondary rounded">
        <form @submit.prevent="$emit('search')" class="card-body">
            <div class="row g-3">
                <div class="col-12 col-md-5">
                    <input
                        type="text"
                        placeholder="What service are you looking for?"
                        class="form-control bg-secondary text-light"
                        :value="searchQuery"
                        @input="$emit('update:searchQuery', $event.target.value)"
                    />
                </div>
                
                <div class="col-12 col-md-4">
                    <input
                        type="text"
                        placeholder="Location"
                        class="form-control bg-secondary text-light"
                        :value="location"
                        @input="$emit('update:location', $event.target.value)"
                    />
                </div>
                
                <div class="col-6 col-md-1">
                    <button 
                        type="button" 
                        class="btn btn-outline-light w-100"
                        @click="toggleFilters"
                        :class="{'active': showFilters}"
                    >
                        <i class="fas fa-sliders-h"></i>
                    </button>
                </div>
                
                <div class="col-6 col-md-2">
                    <button type="submit" class="btn btn-outline-light w-100">
                        <i class="fas fa-search me-2"></i>Search
                    </button>
                </div>
            </div>
            
            <div v-if="showFilters" class="mt-4 pt-4 border-top border-secondary">
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label class="form-label">Service Type</label>
                        <select 
                            class="form-select bg-secondary text-light"
                            :value="filters.serviceType"
                            @change="updateFilters('serviceType', $event.target.value)"
                        >
                            <option value="">All Services</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="home">Home Services</option>
                            <option value="fitness">Fitness</option>
                            <option value="petcare">Pet Care</option>
                        </select>
                    </div>
                    
                    <div class="col-12 col-md-4">
                        <label class="form-label">Price Range</label>
                        <select 
                            class="form-select bg-secondary text-light"
                            :value="filters.priceRange"
                            @change="updateFilters('priceRange', $event.target.value)"
                        >
                            <option value="">Any Price</option>
                            <option value="low">$ (Budget)</option>
                            <option value="medium">$$ (Average)</option>
                            <option value="high">$$$ (Premium)</option>
                        </select>
                    </div>
                    
                    <div class="col-12 col-md-4">
                        <label class="form-label">Availability</label>
                        <select 
                            class="form-select bg-secondary text-light"
                            :value="filters.availability"
                            @change="updateFilters('availability', $event.target.value)"
                        >
                            <option value="">Any Time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="week">This Week</option>
                        </select>
                    </div>
                </div>
                
                <div class="d-flex justify-content-end mt-3">
                    <button type="button" class="btn btn-outline-danger" @click="clearFilters">
                        Clear Filters
                    </button>
                </div>
            </div>
        </form>
    </div>
    `,
    data() {
        return {
            showFilters: false
        }
    },
    methods: {
        toggleFilters() {
            this.showFilters = !this.showFilters;
        },
        updateFilters(key, value) {
            const updatedFilters = {...this.filters};
            updatedFilters[key] = value;
            this.$emit('update:filters', updatedFilters);
        },
        clearFilters() {
            this.$emit('update:filters', {
                serviceType: '',
                priceRange: '',
                availability: ''
            });
        }
    }
}
