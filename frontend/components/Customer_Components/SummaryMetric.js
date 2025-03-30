export default {
    template: `
    <div class="card h-100 bg-dark border border-secondary rounded">
        <div class="card-body d-flex align-items-center">
            <div class="me-3">
                <i :class="'fa ' + iconClass + ' fs-1 text-white'"></i>
            </div>
            <div>
                <h6 class="card-subtitle mb-1 text-muted">{{ title }}</h6>
                <h3 class="card-title mb-0 text-light">{{ value }}</h3>
                <small :class="'text-' + (trend === 'up' ? 'success' : 'danger')">
                    <i :class="'fa fa-arrow-' + trend"></i>
                    {{ trend === 'up' ? '+' : '-' }}{{ Math.floor(Math.random() * 10) }}%
                </small>
            </div>
        </div>
    </div>
    `,
    name: 'SummaryMetric',
    props: {
        title: String,
        value: {
            type: [String, Number],  // Accept both types
            required: true
        },
        icon: String,
        trend: String
    },
    computed: {
        iconClass() {
            // Map Bootstrap icons to FontAwesome
            const iconMap = {
                'users': 'fa-users',
                'dollar-sign': 'fa-dollar-sign',
                'percent': 'fa-percent',
                'activity': 'fa-chart-line'
            };
            return iconMap[this.icon] || 'fa-info-circle';
        }
    }
}
