// import BookingModal from './BookingModal';

// export default {
//   name: 'ServiceDetails',
//   components: {
//     BookingModal
//   },
//   props: {
//     service: {
//       type: Object,
//       default: null
//     }
//   },
//   data() {
//     return {
//       selectedItem: null,
//       isModalOpen: false
//     }
//   },
//   methods: {
//     handleBooking(item) {
//       this.selectedItem = item;
//       this.isModalOpen = true;
//     },
//     handleCloseModal() {
//       this.isModalOpen = false;
//     }
//   },
//   template: `
//     <div v-if="service" class="mt-8 bg-card rounded-2xl shadow-sm p-6 overflow-hidden">
//       <h2 class="text-2xl font-medium text-foreground mb-6">
//         {{ service.name }} Services
//       </h2>
      
//       <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         <div
//           v-for="(item, index) in service.items"
//           :key="item.id"
//           class="bg-background rounded-xl overflow-hidden border border-border hover:transform hover:-translate-y-1 transition-all"
//         >
//           <div class="p-5">
//             <h3 class="font-medium text-foreground text-lg mb-1">{{ item.name }}</h3>
//             <p class="text-muted-foreground text-sm mb-1">{{ item.description }}</p>
//             <p class="text-foreground font-medium mb-4">₹{{ item.price }}</p>
//             <button 
//               class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
//               @click="handleBooking(item)"
//             >
//               Book
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <BookingModal 
//         :isOpen="isModalOpen"
//         :onClose="handleCloseModal"
//         :item="selectedItem"
//       />
//     </div>
//   `
// }



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
