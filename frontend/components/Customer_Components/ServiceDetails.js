import BookingModal from './BookingModal.js';

export default {
  name: 'ServiceDetails',
  components: {
    BookingModal
  },
  props: {
    service: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      selectedItem: null,
      isModalOpen: false
    }
  },
  methods: {
    handleBooking(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
    handleCloseModal() {
      this.isModalOpen = false;
    }
  },
  template: `
    <div v-if="service" class="container mt-4">
      <div class="row justify-content-center">
        <div 
          v-for="item in service.items" 
          :key="item.id" 
          class="col-md-3 mb-3"
        >
          <div class="card bg-dark text-white shadow-sm border border-secondary p-3 h-100">
            <h3 class="card-title">{{ item.name }}</h3>
            <p class="text-muted">{{ item.description }}</p>
            <div class="d-flex align-items-center mb-2">
              <span class="text-warning me-1"><i class="fas fa-star"></i></span>
              <span class="small">{{ item.rating }} ({{ item.reviews }} reviews)</span>
            </div>
            <p class="small text-muted">Provider: {{ item.provider }}</p>
            <p class="small text-muted">{{ item.experience }}</p>
            <p class="fw-bold">₹{{ item.price }}</p>
            <button 
              class="btn btn-primary w-100 mt-auto"
              @click="handleBooking(item)"
            >
              Book
            </button>
          </div>
        </div>
      </div>

      <!-- Booking Modal -->
      <BookingModal 
        :isOpen="isModalOpen"
        :onClose="handleCloseModal"
        :item="selectedItem"
      />
    </div>
  `
}
