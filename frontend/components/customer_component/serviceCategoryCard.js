export default {
    props: ['serviceName', 'serviceId'],
    template: `
    <div class="service-card" @click="navigateToService">
        <div class="card h-100 border-0 rounded-0 bg-warning-subtle">
            <div class="card-body p-3 text-center">
                <div class="service-icon mb-2" v-html="serviceIcon"></div>
                <h5 class="card-title mt-2">{{ serviceName }}</h5>
            </div>
        </div>
    </div>
    `,
    computed: {
        serviceIcon() {
            const serviceLower = this.serviceName.toLowerCase();
            
            if (serviceLower.includes('plumb')) {
                return '<i class="fas fa-wrench" style="font-size: 40px;"></i>';
            } else if (serviceLower.includes('electric')) {
                return '<i class="fas fa-bolt" style="font-size: 40px;"></i>';
            } else if (serviceLower.includes('clean')) {
                return '<i class="fas fa-broom" style="font-size: 40px;"></i>';
            } else if (serviceLower.includes('cook')) {
                return '<i class="fas fa-utensils" style="font-size: 40px;"></i>';
            } else if (serviceLower.includes('repair')) {
                return '<i class="fas fa-hammer" style="font-size: 40px;"></i>';
            } else if (serviceLower.includes('laundry')) {
                return '<i class="fas fa-tshirt" style="font-size: 40px;"></i>';
            } else {
                return '<i class="fas fa-home" style="font-size: 40px;"></i>';
            }
        }
    },
    methods: {
        navigateToService() {
            this.$router.push(`/services/${this.serviceId}`);
        }
    }
}
