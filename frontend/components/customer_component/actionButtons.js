export default {
    props: {
        itemId: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: 'requested'
        },
        showView: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        showReview: {
            type: Boolean,
            default: true
        }
    },
    template: `
    <div class="action-buttons">
        <button 
            v-if="showView" 
            @click="$emit('view', itemId)" 
            class="btn btn-sm btn-outline-primary me-2"
            title="View Details"
        >
            <i class="fas fa-eye"></i>
        </button>
        <button 
            v-if="showCancel && status !== 'completed' && status !== 'closed'" 
            @click="$emit('cancel', itemId)" 
            class="btn btn-sm btn-outline-danger me-2"
            title="Cancel Request"
        >
            <i class="fas fa-times"></i>
        </button>
        <button 
            v-if="showReview && status === 'completed'" 
            @click="$emit('review', itemId)" 
            class="btn btn-sm btn-outline-success"
            title="Leave Review"
        >
            <i class="fas fa-star"></i>
        </button>
    </div>
    `
}