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
    <div class="mt-16">
      <h2 class="text-2xl font-medium mb-6 text-white">Service History</h2>
      
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-white">Loading service history...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <div v-else-if="appointments.length === 0" class="text-center py-5">
        <p class="text-white">No service history found. Book a service to see it here!</p>
      </div>
      
      <div v-else class="rounded-xl overflow-hidden shadow-sm bg-dark">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-primary text-white">
                <th class="py-4 px-6 text-left font-normal">ID</th>
                <th class="py-4 px-6 text-left font-normal">Service</th>
                <th class="py-4 px-6 text-left font-normal">Professional</th>
                <th class="py-4 px-6 text-left font-normal">Booking</th>
                <th class="py-4 px-6 text-left font-normal">Completion</th>
                <th class="py-4 px-6 text-left font-normal">Phone</th>
                <th class="py-4 px-6 text-left font-normal">Status</th>
                <th class="py-4 px-6 text-left font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="appointment in appointments" 
                :key="appointment.id"
                class="border-b border-secondary last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td class="py-4 px-6 text-white">{{ appointment.id }}</td>
                <td class="py-4 px-6 text-white">{{ appointment.service }}</td>
                <td class="py-4 px-6 text-white">{{ appointment.professional }}</td>
                <td class="py-4 px-6 text-white">{{ appointment.bookingDate }}</td>
                <td class="py-4 px-6 text-white">{{ appointment.completionDate || "Pending" }}</td>
                <td class="py-4 px-6 text-white">{{ appointment.phone }}</td>
                <td class="py-4 px-6">
                  <span :class="[
                    'inline-block px-3 py-1 rounded-full text-xs font-medium',
                    appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    appointment.status === 'Requested' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex space-x-2">
                    <button 
                      class="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 hover:text-dark"
                      @click="handleViewDetails(appointment)"
                    >
                      View
                    </button>
                    <button 
                      class="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 hover:text-dark"
                      @click="handleViewRemarks(appointment)"
                      :disabled="appointment.status !== 'Completed'"
                      :class="appointment.status !== 'Completed' ? 'opacity-50 cursor-not-allowed' : ''"
                    >
                      Remarks
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Details Modal -->
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-80" @click="open = false"></div>
        <div class="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <h3 class="text-lg font-medium mb-1">Appointment Details</h3>
          <p class="text-sm text-gray-500 mb-4">
            {{ selectedAppointment?.service }} service on {{ selectedAppointment?.bookingDate }}
          </p>
          
          <div v-if="selectedAppointment" class="space-y-4 py-2">
            <div class="flex justify-between">
              <span class="text-gray-500">ID:</span>
              <span class="font-medium">{{ selectedAppointment.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Package:</span>
              <span class="font-medium">{{ selectedAppointment.package }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Professional:</span>
              <span class="font-medium">{{ selectedAppointment.professional }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Status:</span>
              <span :class="[
                'font-medium',
                selectedAppointment.status === 'Completed' ? 'text-green-600' : 
                selectedAppointment.status === 'Requested' ? 'text-blue-600' : 
                'text-yellow-600'
              ]">
                {{ selectedAppointment.status }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Price:</span>
              <span class="font-medium">₹{{ selectedAppointment.price }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Phone:</span>
              <span class="font-medium">{{ selectedAppointment.phone }}</span>
            </div>
            <div v-if="selectedAppointment.remarks" class="flex flex-col">
              <span class="text-gray-500">Remarks:</span>
              <span class="font-medium mt-1">{{ selectedAppointment.remarks }}</span>
            </div>
            <button 
              v-if="selectedAppointment.status === 'Requested'"
              class="w-full bg-primary text-white py-2 rounded-md mt-4"
              @click="rescheduleAppointment"
            >
              Reschedule
            </button>
            
            <button 
              class="w-full text-center text-gray-500 font-medium text-sm py-2 mt-2"
              @click="open = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
  
      <!-- Remarks Modal -->
      <div v-if="remarksOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-80" @click="remarksOpen = false"></div>
        <div class="relative bg-white rounded-lg max-w-[550px] w-full mx-4 p-6">
          <h3 class="text-xl text-blue-600 text-center mb-1">Service Remarks</h3>
          <p class="text-sm text-gray-500 text-center mb-4">
            Request ID: {{ selectedAppointment?.id }}
          </p>
  
          <div class="grid grid-cols-3 gap-4">
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">{{ selectedAppointment?.service }}</p>
            </div>
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">{{ selectedAppointment?.package }}</p>
            </div>
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">{{ selectedAppointment?.bookingDate }}</p>
            </div>
          </div>
  
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">Professional</p>
            </div>
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">{{ selectedAppointment?.professional }}</p>
            </div>
            <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
              <p class="text-center text-gray-800">{{ selectedAppointment?.phone }}</p>
            </div>
          </div>
  
          <div class="flex flex-col items-center space-y-2 mt-6">
            <label class="font-medium text-gray-700">Service rating:</label>
            <div class="flex space-x-1">
              <span 
                v-for="i in 5" 
                :key="i" 
                @click="setRating(i)"
                :class="[
                  'cursor-pointer text-2xl',
                  i <= rating ? 'text-red-500' : 'text-gray-300'
                ]"
              >★</span>
            </div>
          </div>
  
          <div class="mt-4">
            <label class="font-medium text-gray-700 block mb-2">Remarks (if any):</label>
            <textarea 
              v-model="remarks"
              placeholder="Enter your remarks about the service..." 
              class="w-full border-2 border-gray-300 rounded-md p-2 h-24 resize-none"
            ></textarea>
          </div>
  
          <div class="flex justify-center space-x-6 mt-6">
            <button @click="onSubmitRemarks" class="px-10 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Submit
            </button>
            <button @click="remarksOpen = false" class="px-10 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}
