export default {
    template: `
    <div class="card bg-dark border border-secondary rounded">
        <div class="card-header border-bottom border-secondary">
            <h5 class="card-title mb-0 text-light">{{ title }}</h5>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent border-bottom border-secondary" v-for="(item, index) in items" :key="index">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-light">{{ item.text }}</span>
                        <small class="text-muted ms-3">{{ item.time }}</small>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `,
    name: 'SummaryCard',
    props: {
        title: String,
        items: Array
    }
}
