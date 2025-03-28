export default {
    props: ['results'],
    template: `
    <div class="results-table card bg-dark text-light w-85 mx-auto">
        <div class="table-responsive">
            <table class="table table-hover table-dark">
                <thead>
                    <tr>
                        <th>Professional</th>
                        <th class="d-none d-md-table-cell">Rating</th>
                        <th class="d-none d-md-table-cell">Location</th>
                        <th class="d-none d-md-table-cell">Price</th>
                        <th>Availability</th>
                        <th>Booking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="result in results" :key="result.id">
                        <td>
                            <div class="d-flex align-items-center">
                                <div class="bg-secondary text-light rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                                    {{ result.name.charAt(0) }}
                                </div>
                                <div>
                                    <div class="fw-medium">{{ result.name }}</div>
                                    <div class="text-muted small">{{ result.specialty }}</div>
                                    <!-- Mobile-only info -->
                                    <div class="d-md-none mt-1">
                                        <div class="small">
                                            <i class="fas fa-star text-warning me-1"></i>
                                            {{ result.rating }} <span class="text-muted">({{ result.reviews }})</span>
                                        </div>
                                        <div class="small text-muted">
                                            <i class="fas fa-map-marker-alt me-1"></i>
                                            {{ result.location }}
                                        </div>
                                        <div class="small text-muted">
                                            {{ result.price }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="d-none d-md-table-cell">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-star text-warning me-1"></i>
                                <span>{{ result.rating }}</span>
                                <span class="text-muted small ms-1">({{ result.reviews }})</span>
                            </div>
                        </td>
                        <td class="d-none d-md-table-cell">
                            <i class="fas fa-map-marker-alt text-muted me-1"></i>
                            {{ result.location }}
                        </td>
                        <td class="d-none d-md-table-cell">{{ result.price }}</td>
                        <td>
                            <span :class="getAvailabilityClass(result.availability)">
                                <i class="fas fa-clock me-1"></i>
                                {{ result.availability }}
                            </span>
                        </td>
                        <td>
                            <button 
                                @click="$emit('book', result.id)" 
                                class="btn btn-outline-light btn-sm"
                            >
                                Book Now
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    methods: {
        getAvailabilityClass(availability) {
            if (availability.includes('Today')) {
                return 'text-success';
            } else if (availability.includes('Tomorrow')) {
                return 'text-info';  // Changed from text-primary for better visibility on dark theme
            } else {
                return 'text-muted';
            }
        }
    }
}
