import SearchBar from "../components/Customer_Components/SearchBar.js";
import ResultsTable from "../components/Customer_Components/ResultsTable.js";
import BookingModal from "../components/Customer_Components/BookingModal.js";

export default {
  components: {
    SearchBar,
    ResultsTable,
    BookingModal
  },
  data() {
    return {
      searchQuery: '',
      location: '',
      results: [],
      loading: false,
      searched: false,
      sortOption: 'Relevance',
      filters: {
        serviceType: '',
        priceRange: '',
        availability: ''
      },
      popularCategories: [
        {id: 1, name: 'Healthcare', icon: 'fas fa-heartbeat text-white'},
        {id: 2, name: 'Plumbing', icon: 'fas fa-tools text-white'},
        {id: 3, name: 'Cleaning', icon: 'fas fa-broom text-white'},
        {id: 4, name: 'Fitness', icon: 'fas fa-dumbbell text-white'},
        {id: 5, name: 'Beauty', icon: 'fas fa-cut text-white'},
        {id: 6, name: 'Education', icon: 'fas fa-graduation-cap text-white'},
        {id: 7, name: 'Pet Care', icon: 'fas fa-paw text-white'},
        {id: 8, name: 'Tech Support', icon: 'fas fa-laptop text-white'}
      ],
      selectedService: null,
      showBookingModal: false
    }
  },
  methods: {
    async handleSearch() {
      this.loading = true;
      this.searched = true;
      
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (this.searchQuery) params.append('query', this.searchQuery);
        if (this.location) params.append('location', this.location);
        if (this.filters.serviceType) params.append('serviceType', this.filters.serviceType);
        if (this.filters.priceRange) params.append('priceRange', this.filters.priceRange);
        if (this.filters.availability) params.append('availability', this.filters.availability);
        
        const response = await fetch(`/search-services?${params.toString()}`);
        if (!response.ok) throw new Error('Search failed');
        
        this.results = await response.json();
      } catch (error) {
        console.error('Search error:', error);
        this.results = [];
      } finally {
        this.loading = false;
      }
    },
    
    handleBooking(id) {
      // Find the selected service
      this.selectedService = this.results.find(service => service.id === id);
      this.showBookingModal = true;
    },
    
    closeBookingModal() {
      this.showBookingModal = false;
      this.selectedService = null;
    },
    
    sortResults(criteria) {
      if (criteria === 'rating') {
        this.results.sort((a, b) => b.rating - a.rating);
        this.sortOption = 'Highest Rated';
      } else if (criteria === 'price') {
        this.results.sort((a, b) => a.priceValue - b.priceValue);
        this.sortOption = 'Lowest Price';
      } else if (criteria === 'availability') {
        this.results.sort((a, b) => {
          if (a.availability.includes('Today') && !b.availability.includes('Today')) return -1;
          if (!a.availability.includes('Today') && b.availability.includes('Today')) return 1;
          return 0;
        });
        this.sortOption = 'Earliest Available';
      }
    },
    
    searchByCategory(category) {
      this.searchQuery = category;
      this.handleSearch();
    },
    
    showAllServices() {
      this.searchQuery = '';
      this.location = '';
      this.filters = {
        serviceType: '',
        priceRange: '',
        availability: ''
      };
      this.handleSearch();
    }
  },
  template: `
  <div class="search-container bg-dark text-light p-4 w-75 mx-auto">
      <h2 class="mb-4">Find Services</h2>
      
      <SearchBar 
          @search="handleSearch" 
          :searchQuery="searchQuery" 
          :location="location"
          @update:searchQuery="searchQuery = $event"
          @update:location="location = $event"
          :filters="filters"
          @update:filters="filters = $event"
      />
      
      <div v-if="loading" class="d-flex justify-content-center py-4">
          <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      </div>
      
      <div v-else-if="results.length > 0" class="mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="border p-2 rounded bg-dark">
                <p class="mb-0">Showing {{ results.length }} results for "{{ searchQuery }}" in {{ location || 'all locations' }}</p>
            </div>
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown">
                    Sort by: {{ sortOption }}
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="sortDropdown">
                    <li><a class="dropdown-item" href="#" @click.prevent="sortResults('rating')">Highest Rated</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="sortResults('price')">Lowest Price</a></li>
                    <li><a class="dropdown-item" href="#" @click.prevent="sortResults('availability')">Earliest Available</a></li>
                </ul>
            </div>
        </div>
          
          <ResultsTable 
              :results="results" 
              @book="handleBooking"
          />
      </div>
      
      <div v-else-if="searched" class="text-center py-5">
          <i class="fas fa-search fa-3x mb-3 text-light"></i>
          <h3 class="h5">No results found</h3>
          <p class="text-muted">Try adjusting your search or filters.</p>
          <button class="btn btn-outline-light mt-2" @click="showAllServices">Browse All Services</button>
      </div>
      
      <div v-else class="py-4">
          <h3 class="bg-dark text-light py-2 px-3 rounded mb-3">Popular Categories</h3>
          <div class="row g-4">
              <div v-for="category in popularCategories" :key="category.id" class="col-6 col-md-4 col-lg-3">
                  <div class="card h-100 service-category-card bg-dark text-light border border-secondary" @click="searchByCategory(category.name)">
                      <div class="card-body text-center">
                          <i :class="category.icon + ' fa-2x mb-3 text-info'"></i>
                          <h4 class="h6 mb-0">{{ category.name }}</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <BookingModal 
          :isOpen="showBookingModal" 
          :onClose="closeBookingModal" 
          :item="selectedService"
      />
  </div>
  `
}
