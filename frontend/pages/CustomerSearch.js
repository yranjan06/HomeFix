import SearchBar from "../components/Customer_Components/SearchBar";
import ResultsTable from "../components/Customer_Components/ResultsTable";

export default { components: {
  SearchBar,
  ResultsTable,
 
},
  props: [],
  template: `
  <div class="search-container">
      <SearchBar 
          @search="handleSearch" 
          :searchQuery="searchQuery" 
          :location="location"
          @update:searchQuery="searchQuery = $event"
          @update:location="location = $event"
      />
      
      <div v-if="loading" class="d-flex justify-content-center py-4">
          <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      </div>
      
      <ResultsTable 
          v-else-if="results.length > 0" 
          :results="results" 
          @book="handleBooking"
      />
      
      <div v-else-if="searched" class="text-center py-4">
          <i class="fas fa-search fa-3x mb-3 text-muted"></i>
          <h3 class="h5">No results found</h3>
          <p class="text-muted">Try adjusting your search or filters.</p>
      </div>
  </div>
  `,
  data() {
      return {
          searchQuery: '',
          location: '',
          results: [],
          loading: false,
          searched: false
      }
  },
  methods: {
      handleSearch() {
          this.loading = true;
          this.searched = true;
          
          // Simulate API call
          setTimeout(() => {
              this.results = [
                  {id: 1, name: 'Dr. Sarah Johnson', specialty: 'Dentist', rating: 4.8, reviews: 127, location: 'New York, NY', price: '$120', availability: 'Today, 2:00 PM'},
                  {id: 2, name: 'Michael Chen', specialty: 'Plumber', rating: 4.6, reviews: 89, location: 'New York, NY', price: '$85/hr', availability: 'Tomorrow, 10:00 AM'},
                  {id: 3, name: 'Lisa Rodriguez', specialty: 'Personal Trainer', rating: 4.9, reviews: 215, location: 'New York, NY', price: '$65/session', availability: 'Today, 5:30 PM'}
              ];
              this.loading = false;
          }, 1500);
      },
      handleBooking(id) {
          alert(`Booking professional with ID: ${id}`);
      }
  }
}
