export default {
    props: ['results'],
    template: `
    <div class="results-table card">
        <div class="table-responsive">
            <table class="table table-hover">
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
                                <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                                    {{ result.name.charAt(0) }}
                                </div>
                                <div>
                                    <div class="fw-medium">{{ result.name }}</div>
                                    <div class="text-muted small">{{ result.specialty }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="d-none d-md-table-cell">
                            <i class="fas fa-star text-warning me-1"></i>
                            {{ result.rating }}
                            <span class="text-muted small">({{ result.reviews }})</span>
                        </td>
                        <td class="d-none d-md-table-cell">
                            <i class="fas fa-map-marker-alt text-muted me-1"></i>
                            {{ result.location }}
                        </td>
                        <td class="d-none d-md-table-cell">{{ result.price }}</td>
                        <td>
                            <i class="fas fa-clock text-muted me-1"></i>
                            {{ result.availability }}
                        </td>
                        <td>
                            <button 
                                @click="$emit('book', result.id)" 
                                class="btn btn-primary btn-sm"
                            >
                                Book Now
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
}
