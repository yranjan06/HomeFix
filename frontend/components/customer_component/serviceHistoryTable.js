export default {
    template: `
    <div class="service-history my-4">
        <h4 class="mb-3">Service History</h4>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead class="table-success">
                    <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Professional</th>
                        <th>Booking</th>
                        <th>Completion</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="request in serviceRequests" :key="request.id">
                        <td>{{ request.id }}</td>
                        <td>{{ request.package.name }}</td>
                        <td>{{ request.professional ? request.professional.user.full_name : 'Pending' }}</td>
                        <td>{{ formatDate(request.date_of_request) }}</td>
                        <td>{{ request.date_of_completion ? formatDate(request.date_of_completion) : 'Pending' }}</td>
                        <td>{{ request.professional ? request.professional.user.phone_number : 'N/A' }}</td>
                        <td>
                            <span :class="getStatusClass(request.status)">{{ capitalizeFirst(request.status) }}</span>
                        </td>
                        <td>
                            <action-buttons 
                                :itemId="request.id"
                                :status="request.status"
                                @view="viewDetails"
                                @cancel="cancelRequest"
                                @review="leaveReview"
                            />
                        </td>
                    </tr>
                    <tr v-if="serviceRequests.length === 0">
                        <td colspan="8" class="text-center py-3">No service requests found</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    components: {
        'action-buttons': () => import('./actionButtons.js')
    },
    data() {
        return {
            serviceRequests: []
        }
    },
    mounted() {
        this.fetchServiceRequests();
    },
    methods: {
        async fetchServiceRequests() {
            try {
                const response = await fetch('/api/service-requests');
                if (response.ok) {
                    this.serviceRequests = await response.json();
                } else {
                    console.error('Failed to fetch service requests');
                }
            } catch (error) {
                console.error('Error fetching service requests:', error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },
        capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        getStatusClass(status) {
            const statusClasses = {
                'requested': 'badge rounded-pill bg-warning text-dark',
                'accepted': 'badge rounded-pill bg-info text-dark',
                'completed': 'badge rounded-pill bg-success',
                'closed': 'badge rounded-pill bg-secondary'
            };
            return statusClasses[status] || 'badge rounded-pill bg-light text-dark';
        },
        viewDetails(id) {
            this.$router.push(`/service-requests/${id}`);
        },
        async cancelRequest(id) {
            if (confirm('Are you sure you want to cancel this service request?')) {
                try {
                    const response = await fetch(`/api/service-requests/${id}/cancel`, {
                        method: 'POST'
                    });
                    if (response.ok) {
                        // Update the local state or refetch
                        this.fetchServiceRequests();
                    } else {
                        console.error('Failed to cancel service request');
                    }
                } catch (error) {
                    console.error('Error cancelling service request:', error);
                }
            }
        },
        leaveReview(id) {
            this.$router.push(`/service-requests/${id}/review`);
        }
    }
}