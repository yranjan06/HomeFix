import BookingModal from './BookingModal';

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
    <div v-if="service" class="mt-8 bg-card rounded-2xl shadow-sm p-6 overflow-hidden">
      <h2 class="text-2xl font-medium text-foreground mb-6">
        {{ service.name }} Services
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(item, index) in service.items"
          :key="item.id"
          class="bg-background rounded-xl overflow-hidden border border-border hover:transform hover:-translate-y-1 transition-all"
        >
          <div class="p-5">
            <h3 class="font-medium text-foreground text-lg mb-1">{{ item.name }}</h3>
            <p class="text-muted-foreground text-sm mb-1">{{ item.description }}</p>
            <p class="text-foreground font-medium mb-4">₹{{ item.price }}</p>
            <button 
              class="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
              @click="handleBooking(item)"
            >
              Book
            </button>
          </div>
        </div>
      </div>
      
      <BookingModal 
        :isOpen="isModalOpen"
        :onClose="handleCloseModal"
        :item="selectedItem"
      />
    </div>
  `
}
