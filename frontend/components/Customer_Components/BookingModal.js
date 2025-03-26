export default {
  name: 'BookingModal',
  props: {
    isOpen: Boolean,
    onClose: Function,
    item: Object
  },
  data() {
    return {
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      phone: '',
      today: new Date().toISOString().split('T')[0],
      alertMessage: '',
      alertType: '',
      showAlert: false,
      loading: false
    }
  },
  methods: {
    showNotification(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      this.showAlert = true;
      
      // Hide the alert after 3 seconds
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
    
    async handleConfirm() {
      if (!this.date || !this.time || !this.phone) {
        this.showNotification("Please fill in all required fields", "danger");
        return;
      }

      try {
        this.loading = true;
        const response = await fetch('/request-service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('token')
          },
          body: JSON.stringify({
            package_id: this.item.id,
            date: this.date,
            time: this.time,
            phone: this.phone
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to book service');
        }

        this.showNotification(`${this.item.name} service booked successfully!`, "success");

        // Reset form and close modal after a short delay
        setTimeout(() => {
          this.time = "19:00";
          this.phone = "";
          this.onClose();
        }, 1500);
      } catch (error) {
        this.showNotification(error.message || 'An error occurred while booking', "danger");
        console.error('Booking error:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  template: `
    <div v-if="isOpen" class="modal d-block" tabindex="-1" role="dialog" style="z-index: 1050;">
      <div class="modal-dialog modal-dialog-centered" role="document" style="z-index: 1055;">
        <div class="modal-content bg-dark text-white border border-secondary" @click.stop>
          <div class="modal-header border-secondary">
            <h5 class="modal-title">Book Service</h5>
            <button type="button" class="btn-close btn-close-white" @click="onClose"></button>
          </div>
          
          <div class="modal-body">
            <!-- Alert message -->
            <div v-if="showAlert" :class="'alert alert-' + alertType" role="alert">
              {{ alertMessage }}
            </div>
            
            <div class="row">
              <!-- Service info section -->
              <div class="col-md-6 mb-3">
                <div class="p-3 bg-dark border border-secondary rounded">
                  <div class="badge bg-secondary mb-2">
                    {{ item.name }}
                  </div>
                  <h5 class="fw-bold">{{ item.provider || 'Service Provider' }}</h5>
                  <p class="text-muted small">Regular Service</p>
                  
                  <div class="d-flex align-items-center mb-2">
                    <span class="text-warning me-1"><i class="fas fa-star"></i></span>
                    <span class="small">
                      {{ item.rating ? \`\${item.rating} (\${item.reviews} reviews)\` : 'Unrated (0 reviews)' }}
                    </span>
                  </div>
                  
                  <div class="fs-4 fw-bold mt-2">
                    ₹{{ item.price }} <span class="text-muted small">/-</span>
                  </div>
                  
                  <div class="mt-3">
                    <span class="badge bg-secondary me-2">{{ item.experience || '1-3 yrs xp' }}</span>
                  </div>
                </div>
              </div>

              <!-- Booking form section -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Time</label>
                  <div class="input-group">
                    <span class="input-group-text bg-dark text-white border-secondary">
                      <i class="fas fa-clock"></i>
                    </span>
                    <input 
                      type="time" 
                      v-model="time" 
                      class="form-control bg-dark text-white border-secondary"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Date</label>
                  <input 
                    type="date" 
                    v-model="date" 
                    class="form-control bg-dark text-white border-secondary"
                    :min="today"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    v-model="phone"
                    placeholder="Your phone number"
                    class="form-control bg-dark text-white border-secondary"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer border-secondary">
            <button 
              @click="handleConfirm"
              class="btn btn-primary w-100"
              :disabled="loading"
            >
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ loading ? 'Processing...' : 'Confirm Booking' }}
            </button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show" style="z-index: 1040;"></div>
    </div>
  `
}
