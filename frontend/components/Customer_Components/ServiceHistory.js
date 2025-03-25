export default {
    name: 'ServiceHistory',
    props: {
      appointments: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        selectedAppointment: null,
        open: false,
        remarksOpen: false,
        rating: 0,
        remarks: ''
      }
    },
    methods: {
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
      onSubmitRemarks() {
        this.$toast.success("Service remarks submitted successfully!");
        this.remarksOpen = false;
      },
      setRating(value) {
        this.rating = value;
      }
    },
    template: `
      <div class="mt-16">
        <h2 class="text-2xl font-medium mb-6 text-foreground">Service History</h2>
        
        <div class="rounded-xl overflow-hidden shadow-sm bg-card">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-primary text-primary-foreground">
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
                  class="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td class="py-4 px-6">{{ appointment.id }}</td>
                  <td class="py-4 px-6">{{ appointment.service }}</td>
                  <td class="py-4 px-6">{{ appointment.professional }}</td>
                  <td class="py-4 px-6">{{ appointment.bookingDate }}</td>
                  <td class="py-4 px-6">{{ appointment.completionDate || "Pending" }}</td>
                  <td class="py-4 px-6">{{ appointment.phone }}</td>
                  <td class="py-4 px-6">
                    <span :class="[
                      'inline-block px-3 py-1 rounded-full text-xs font-medium',
                      appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ appointment.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex space-x-2">
                      <button 
                        class="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
                        @click="handleViewDetails(appointment)"
                      >
                        View
                      </button>
                      <button 
                        class="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
                        @click="handleViewRemarks(appointment)"
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
                <span class="text-gray-500">Professional:</span>
                <span class="font-medium">{{ selectedAppointment.professional }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Status:</span>
                <span :class="[
                  'font-medium',
                  selectedAppointment.status === 'Completed' ? 'text-green-600' : 
                  selectedAppointment.status === 'Scheduled' ? 'text-blue-600' : 
                  'text-yellow-600'
                ]">
                  {{ selectedAppointment.status }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Phone:</span>
                <span class="font-medium">{{ selectedAppointment.phone }}</span>
              </div>
              <button 
                v-if="selectedAppointment.status === 'Scheduled'"
                class="w-full bg-primary text-white py-2 rounded-md mt-4"
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
                <p class="text-center text-gray-800">{{ selectedAppointment?.service }} Service</p>
              </div>
              <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
                <p class="text-center text-gray-800">{{ selectedAppointment?.bookingDate }}</p>
              </div>
            </div>
  
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div class="border border-pink-200 bg-pink-50 p-4 flex items-center justify-center rounded-lg">
                <p class="text-center text-gray-800">Professional ID</p>
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
  