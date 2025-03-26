export default {
  name: 'ServiceHistory',
  data() {
    return {
      appointments: [],
      loading: true,
      error: null,
      selectedAppointment: null,
      open: false,
      remarksOpen: false,
      rating: 0,
      remarks: ''
    }
  },
  methods: {
    async fetchAppointments() {
      try {
        this.loading = true;
        const token = localStorage.getItem('token');
        
        if (!token) {
          this.error = 'Please log in to view your service history';
          this.loading = false;
          return;
        }
        
        const response = await fetch('/my-requests', {
          headers: {
            'Authentication-Token': localStorage.getItem('token')
          }
        });
        
        if (response.status === 401 || response.status === 403) {
          this.error = 'Please log in to view your service history';
          this.loading = false;
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch service history');
        }
        
        const data = await response.json();
        this.appointments = data.map(req => ({
          id: req.id,
          service: req.service_name,
          package: req.package_name,
          professional: req.professional_name || 'Assigned Provider',
          bookingDate: new Date(req.date_of_request).toLocaleDateString(),
          completionDate: req.date_of_completion ? new Date(req.date_of_completion).toLocaleDateString() : null,
          phone: localStorage.getItem('phone') || 'Contact Support',
          status: req.status.charAt(0).toUpperCase() + req.status.slice(1),
          price: req.price,
          remarks: req.remarks
        }));
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
        console.error('Error fetching appointments:', error);
      }
    },
    handleViewDetails(appointment) {
      this.selectedAppointment = appointment;
      this.open = true;
    },
    handleViewRemarks(appointment) {
      this.selectedAppointment = appointment;
      this.remarksOpen = true;
      this.remarks = '';
      this.rating = appointment.status === 'Completed' ? 3 : 0;
    },
    async onSubmitRemarks() {
      if (!this.selectedAppointment) return;
      
      try {
        const response = await fetch(`/add-review/${this.selectedAppointment.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            rating: this.rating,
            comment: this.remarks
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit review');
        }
        
        alert("Service remarks submitted successfully!");
        this.remarksOpen = false;
        this.fetchAppointments(); // Refresh the list
      } catch (error) {
        alert(error.message || "Failed to submit review");
        console.error('Error submitting review:', error);
      }
    },
    setRating(value) {
      this.rating = value;
    },
    async rescheduleAppointment() {
      // This would be implemented to call the update-request endpoint
      if (!this.selectedAppointment) return;
      
      try {
        const response = await fetch(`/update-request/${this.selectedAppointment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            status: 'rescheduled',
            remarks: 'Customer requested reschedule'
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to reschedule appointment');
        }
        
        alert("Appointment rescheduled successfully!");
        this.open = false;
        this.fetchAppointments(); // Refresh the list
      } catch (error) {
        alert(error.message || "Failed to reschedule appointment");
        console.error('Error rescheduling appointment:', error);
      }
    }
  },
  mounted() {
    this.fetchAppointments();
  },
  template: `
    <div class="container mt-4">
      <div class="customer-welcome-card mt-4 ms-4 d-inline-block p-3 bg-dark border border-secondary rounded">
      <h3 class="text-white mb-0">Service Booking</h3>
    </div>    
      <div v-if="loading" class="text-center py-7">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-light">Loading service history...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <div v-else-if="appointments.length === 0" class="text-center py-5">
        <p class="text-light">No service history found. Book a service to see it here!</p>
      </div>
      
      <div v-else class="table-responsive">
        <table class="table table-dark table-hover">
          <thead class="bg-primary text-white">
            <tr>
              <th class="py-3">ID</th>
              <th class="py-3">Service</th>
              <th class="py-3">Professional</th>
              <th class="py-3">Booking</th>
              <th class="py-3">Completion</th>
              <th class="py-3">Phone</th>
              <th class="py-3">Status</th>
              <th class="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.id }}</td>
              <td>{{ appointment.service }}</td>
              <td>{{ appointment.professional }}</td>
              <td>{{ appointment.bookingDate }}</td>
              <td>{{ appointment.completionDate || "Pending" }}</td>
              <td>{{ appointment.phone }}</td>
              <td>
                <span :class="[
                  'badge',
                  appointment.status === 'Completed' ? 'bg-success' : 
                  appointment.status === 'Requested' ? 'bg-primary' : 
                  'bg-warning text-dark'
                ]">
                  {{ appointment.status }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-light me-2" @click="handleViewDetails(appointment)">
                  View
                </button>
                <button 
                  class="btn btn-sm btn-outline-light"
                  @click="handleViewRemarks(appointment)"
                  :disabled="appointment.status !== 'Completed'"
                >
                  Remarks
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Details Modal -->
      <div v-if="open" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header border-secondary">
              <h5 class="modal-title">Appointment Details</h5>
              <button type="button" class="btn-close btn-close-white" @click="open = false"></button>
            </div>
            <div class="modal-body" v-if="selectedAppointment">
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">ID:</span>
                <span>{{ selectedAppointment.id }}</span>
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">Package:</span>
                <span>{{ selectedAppointment.package }}</span>
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">Professional:</span>
                <span>{{ selectedAppointment.professional }}</span>
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">Status:</span>
                <span :class="[
                  selectedAppointment.status === 'Completed' ? 'text-success' : 
                  selectedAppointment.status === 'Requested' ? 'text-primary' : 
                  'text-warning'
                ]">
                  {{ selectedAppointment.status }}
                </span>
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">Price:</span>
                <span>₹{{ selectedAppointment.price }}</span>
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <span class="text-secondary">Phone:</span>
                <span>{{ selectedAppointment.phone }}</span>
              </div>
              <div v-if="selectedAppointment.remarks" class="mb-3">
                <span class="text-secondary d-block mb-1">Remarks:</span>
                <span>{{ selectedAppointment.remarks }}</span>
              </div>
            </div>
            <div class="modal-footer border-secondary">
              <button 
                v-if="selectedAppointment?.status === 'Requested'"
                class="btn btn-primary"
                @click="rescheduleAppointment"
              >
                Reschedule
              </button>
              <button class="btn btn-secondary" @click="open = false">Close</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      </div>

      <!-- Remarks Modal -->
      <div v-if="remarksOpen" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header border-secondary">
              <h5 class="modal-title text-primary">Service Remarks</h5>
              <button type="button" class="btn-close btn-close-white" @click="remarksOpen = false"></button>
            </div>
            <div class="modal-body">
              <p class="text-secondary text-center mb-4">
                Request ID: {{ selectedAppointment?.id }}
              </p>
              
              <div class="row mb-4">
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    {{ selectedAppointment?.service }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    {{ selectedAppointment?.package }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    {{ selectedAppointment?.bookingDate }}
                  </div>
                </div>
              </div>
              
              <div class="row mb-4">
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    Professional
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    {{ selectedAppointment?.professional }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-3 bg-secondary bg-opacity-25 rounded text-center">
                    {{ selectedAppointment?.phone }}
                  </div>
                </div>
              </div>
              
              <div class="text-center mb-3">
                <label class="form-label">Service rating:</label>
                <div class="d-flex justify-content-center">
                  <span 
                    v-for="i in 5" 
                    :key="i" 
                    @click="setRating(i)"
                    :class="[
                      'fs-3 cursor-pointer mx-1',
                      i <= rating ? 'text-warning' : 'text-secondary'
                    ]"
                  >★</span>
                </div>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Remarks (if any):</label>
                <textarea 
                  v-model="remarks"
                  class="form-control bg-dark text-light"
                  placeholder="Enter your remarks about the service..."
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div class="modal-footer border-secondary">
              <button @click="onSubmitRemarks" class="btn btn-primary">Submit</button>
              <button @click="remarksOpen = false" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
        <div class="modal-backdrop fade show"></div>
      </div>
    </div>
  `
}
