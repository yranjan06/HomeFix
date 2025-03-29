export default{
    template:`
    <div class="card h-100">
        <div class="card-body d-flex align-items-center">
        <div class="me-3">
            <i :class="`bi bi-${icon} fs-1 text-primary`"></i>
        </div>
        <div>
            <h6 class="card-subtitle mb-1 text-muted">{{ title }}</h6>
            <h3 class="card-title mb-0">{{ value }}</h3>
            <small :class="`text-${trend === 'up' ? 'success' : 'danger'}`">
            <i :class="`bi bi-arrow-${trend}`"></i>
            {{ trend === 'up' ? '+' : '-' }}{{ Math.floor(Math.random() * 10) }}%
            </small>
        </div>
        </div>
    </div>
    </template>

    <script>
    export default {
    name: 'SummaryMetric',
    props: {
        title: String,
        value: String,
        icon: String,
        trend: String
    }
    }
    </script>`
}