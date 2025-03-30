export default {
    template: `
    <div class="card bg-dark border border-secondary rounded">
        <div class="card-header border-bottom border-secondary">
            <h5 class="card-title mb-0 text-light">Recent Service Requests</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th class="text-light">ID</th>
                            <th class="text-light">Service</th>
                            <th class="text-light">Status</th>
                            <th class="text-light">Date</th>
                            <th class="text-light">Professional</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td class="text-light">{{ item.id }}</td>
                            <td class="text-light">{{ item.service_name }}</td>
                            <td>
                                <span :class="'badge bg-' + getStatusColor(item.status)">{{ item.status }}</span>
                            </td>
                            <td class="text-light">{{ item.date }}</td>
                            <td class="text-light">{{ item.professional_name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    name: 'SummaryTable',
    props: {
        items: Array
    },
    methods: {
        getStatusColor(status) {
            switch(status) {
                case 'completed': return 'success';
                case 'requested': return 'warning';
                case 'accepted': return 'info';
                case 'closed': return 'secondary';
                default: return 'primary';
            }
        }
    }
}
