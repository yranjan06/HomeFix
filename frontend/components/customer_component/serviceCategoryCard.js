export default {
    props: ['serviceName', 'serviceId'],
    template: `
    <div class="service-card" @click="navigateToService">
        <div class="card h-100 border-0 rounded-0 bg-warning-subtle">
            <div class="card-body p-3 text-center">
                <div class="service-icon mb-2" v-html="serviceIcon"></div>
                <h5 class="card-title mt-2">{{serviceName}}</h5>
            </div>
        </div>
    </div>
    `,
    computed: {
        serviceIcon() {
            const serviceLower = this.serviceName.toLowerCase();
            
            if (serviceLower.includes('plumb')) {
                return '<div style="font-size: 40px;"><i class="fas fa-wrench"></i></div>';
            } else if (serviceLower.includes('electric')) {
                return '<div style="font-size: 40px;"><i class="fas fa-bolt"></i></div>';
            } else if (serviceLower.includes('clean')) {
                return '<div style="font-size: 40px;"><i class="fas fa-broom"></i></div>';
            } else if (serviceLower.includes('cook')) {
                return '<div style="font-size: 40px;"><i class="fas fa-utensils"></i></div>';
            } else if (serviceLower.includes('repair')) {
                return '<div style="font-size: 40px;"><i class="fas fa-hammer"></i></div>';
            } else if (serviceLower.includes('laundry')) {
                return '<div style="font-size: 40px;"><i class="fas fa-tshirt"></i></div>';
            } else {
                return '<div style="font-size: 40px;"><i class="fas fa-home"></i></div>';
            }
        }
    },
    methods: {
        navigateToService() {
            this.$router.push(`/services/${this.serviceId}`);
        }
    }
}