export default {
    props: ['searchQuery', 'location'],
    template: `
    <div class="search-bar card mb-4">
        <form @submit.prevent="$emit('search')" class="card-body">
            <div class="row g-3">
                <div class="col-12 col-md-5">
                    <input
                        type="text"
                        placeholder="What service are you looking for?"
                        class="form-control"
                        :value="searchQuery"
                        @input="$emit('update:searchQuery', $event.target.value)"
                    />
                </div>
                
                <div class="col-12 col-md-4">
                    <input
                        type="text"
                        placeholder="Location"
                        class="form-control"
                        :value="location"
                        @input="$emit('update:location', $event.target.value)"
                    />
                </div>
                
                <div class="col-6 col-md-1">
                    <button 
                        type="button" 
                        class="btn btn-outline-secondary w-100"
                        @click="toggleFilters"
                    >
                        <i class="fas fa-sliders-h"></i>
                    </button>
                </div>
                
                <div class="col-6 col-md-2">
                    <button type="submit" class="btn btn-primary w-100">
                        <i class="fas fa-search me-2"></i>Search
                    </button>
                </div>
            </div>
            
            <div v-if="showFilters" class="mt-4 pt-4 border-top">
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label class="form-label">Service Type</label>
                        <select class="form-select">
                            <option value="">All Services</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="home">Home Services</option>
                            <option value="fitness">Fitness</option>
                        </select>
                    </div>
                    
                    <div class="col-12 col-md-4">
                        <label class="form-label">Price Range</label>
                        <select class="form-select">
                            <option value="">Any Price</option>
                            <option value="low">$ (Budget)</option>
                            <option value="medium">$$ (Average)</option>
                            <option value="high">$$$ (Premium)</option>
                        </select>
                    </div>
                    
                    <div class="col-12 col-md-4">
                        <label class="form-label">Availability</label>
                        <select class="form-select">
                            <option value="">Any Time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="week">This Week</option>
                        </select>
                    </div>
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
        }
    }
}
