import { format } from 'date-fns';

export default {
  name: 'BookingModal',
  props: {
    isOpen: Boolean,
    onClose: Function,
    item: Object
  },
  data() {
    return {
      date: new Date(),
      time: '19:00',
      phone: '',
      today: format(new Date(), 'yyyy-MM-dd')
    }
  },
  methods: {
    handleConfirm() {
      if (!this.date || !this.time || !this.phone) {
        this.$toast.error("Please fill in all required fields");
        return;
      }

      this.$toast.success(`${this.item.name} service booked successfully!`, {
        description: `Your appointment has been scheduled for ${format(this.date, "dd-MM-yyyy")} at ${this.time}.`,
      });

      // Reset form
      this.time = "19:00";
      this.phone = "";
      this.onClose();
    }
  },
  template: `
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black bg-opacity-80" @click="onClose"></div>
      <div class="relative bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
        <div class="p-4 border-b">
          <h2 class="text-xl font-medium">Book Service</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <!-- Service info section -->
          <div class="bg-orange-50 rounded-xl p-4">
            <div class="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm inline-block mb-2">
              {{ item.name }}
            </div>
            <h3 class="text-xl font-semibold flex items-center gap-1">
              {{ item.provider || 'Service Provider' }}
              <span class="text-gray-400 text-xs">✏️</span>
            </h3>
            <p class="text-gray-500 text-sm">Regular Service</p>
            
            <div class="flex items-center gap-1 my-2">
              <span class="text-yellow-500">★</span>
              <span class="text-gray-500 text-sm">
                {{ item.rating ? \`\${item.rating} (\${item.reviews} reviews)\` : 'Unrated (0 reviews)' }}
              </span>
            </div>
            
            <div class="text-2xl font-bold mt-2">
              ₹{{ item.price.toFixed(1) }} <span class="text-gray-400 text-sm font-normal">/-</span>
            </div>
            
            <div class="flex gap-2 mt-4">
              <div class="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm">
                {{ item.experience || '1-3 yrs xp' }}
              </div>
              <button class="bg-orange-50 border border-orange-200 text-orange-800 py-1 px-3 rounded-full text-sm">
                Save
              </button>
            </div>
          </div>

          <!-- Booking form section -->
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium">Time</label>
              <div class="relative">
                <input 
                  type="time" 
                  v-model="time" 
                  class="w-full p-2 pl-10 border rounded-md"
                />
                <span class="absolute left-3 top-3 text-gray-500">
                  <i class="fas fa-clock"></i>
                </span>
              </div>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium">Date</label>
              <input 
                type="date" 
                v-model="date" 
                class="w-full p-2 border rounded-md"
                :min="today"
              />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                v-model="phone"
                placeholder="Your phone number"
                class="w-full p-2 border rounded-md"
              />
            </div>

            <button 
              @click="handleConfirm"
              class="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md"
            >
              Confirm
            </button>

            <button 
              class="w-full text-center text-orange-500 font-medium text-sm py-2"
              @click="onClose"
            >
              Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}
