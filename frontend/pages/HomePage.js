export default {
    template: `
    <div class="dark-theme">
        <!-- Hero Section - Minimalist Dark -->
        <div class="bg-gray-900 py-5">
            <div class="container py-5">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <h1 class="display-4 fw-light mb-4 text-white">Home services, redefined.</h1>
                        <p class="lead mb-4 text-gray-400">Connecting you with vetted professionals for all your home needs.</p>
                        <div class="d-flex gap-3">
                            <router-link to="/login" class="btn btn-outline-light rounded-0 px-4 py-2">Find Service</router-link>
                            <router-link to="/register" class="btn btn-outline-light rounded-0 px-4 py-2">Become Provider</router-link>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="card bg-gray-800 p-4 h-100 border-0 rounded-0">
                                    <div class="text-white fs-3 mb-2 fw-light">4.8</div>
                                    <div class="text-gray-400">Customer Rating</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card bg-gray-800 p-4 h-100 border-0 rounded-0">
                                    <div class="text-white fs-3 mb-2 fw-light">10k+</div>
                                    <div class="text-gray-400">Professionals</div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="card bg-gray-800 p-4 border-0 rounded-0">
                                    <div class="text-white fs-3 mb-2 fw-light">50k+</div>
                                    <div class="text-gray-400">Completed Jobs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Services Section - Minimalist Cards -->
        <div class="bg-gray-800 py-5">
            <div class="container">
                <h2 class="text-center mb-5 fw-light text-white">Services</h2>
                <div class="row g-4">
                    <div v-for="service in featuredServices" :key="service.id" class="col-md-4">
                        <div class="card h-100 bg-gray-900 border-0 rounded-0">
                            <div class="card-body p-4">
                                <div class="service-icon mb-4 text-center text-white" v-html="getServiceIcon(service.name)"></div>
                                <h5 class="card-title mb-3 text-white fw-light text-center">{{ service.name }}</h5>
                                <p class="card-text text-gray-400 mb-4 text-center">{{ service.description }}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-white">₹{{ service.base_price }}</span>
                                    <router-link :to="'/services/' + service.id" class="btn btn-sm btn-outline-light rounded-0">View</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- How It Works - Refined Steps -->
        <div class="bg-gray-900 py-5">
            <div class="container">
                <h2 class="text-center mb-5 fw-light text-white">Process</h2>
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card h-100 bg-gray-800 border-0 rounded-0">
                            <div class="card-body p-4">
                                <div class="text-white d-flex align-items-center justify-content-center mb-4 border border-white rounded-0" style="width: 50px; height: 50px;">
                                    <span class="mb-0">01</span>
                                </div>
                                <h5 class="fw-light mb-3 text-white">Select</h5>
                                <p class="text-gray-400">Browse our curated selection of premium services.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 bg-gray-800 border-0 rounded-0">
                            <div class="card-body p-4">
                                <div class="text-white d-flex align-items-center justify-content-center mb-4 border border-white rounded-0" style="width: 50px; height: 50px;">
                                    <span class="mb-0">02</span>
                                </div>
                                <h5 class="fw-light mb-3 text-white">Schedule</h5>
                                <p class="text-gray-400">Book a verified professional at your convenience.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 bg-gray-800 border-0 rounded-0">
                            <div class="card-body p-4">
                                <div class="text-white d-flex align-items-center justify-content-center mb-4 border border-white rounded-0" style="width: 50px; height: 50px;">
                                    <span class="mb-0">03</span>
                                </div>
                                <h5 class="fw-light mb-3 text-white">Experience</h5>
                                <p class="text-gray-400">Enjoy professional service with guaranteed quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Testimonials - Minimalist Cards -->
        <div class="bg-gray-800 py-5">
            <div class="container">
                <h2 class="text-center mb-5 fw-light text-white">Testimonials</h2>
                <div class="row g-4">
                    <div v-for="(testimonial, index) in testimonials" :key="index" class="col-md-4">
                        <div class="card h-100 bg-gray-900 border-0 rounded-0">
                            <div class="card-body p-4">
                                <div class="mb-3 text-white">
                                    {{ "★".repeat(testimonial.rating) }}{{ "☆".repeat(5 - testimonial.rating) }}
                                </div>
                                <p class="card-text mb-4 text-gray-400 fst-italic">{{ testimonial.comment }}</p>
                                <div class="d-flex align-items-center">
                                    <div class="border border-white text-white rounded-0 d-flex align-items-center justify-content-center me-3" style="width: 30px; height: 30px;">
                                        {{ testimonial.name.charAt(0) }}
                                    </div>
                                    <span class="fw-light text-white">{{ testimonial.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section - Minimalist Dark -->
        <div class="bg-gray-900 py-5 text-center">
            <div class="container py-4">
                <h2 class="mb-4 fw-light text-white">Ready?</h2>
                <p class="mb-4 text-gray-400">Join our community of satisfied clients</p>
                <div class="d-flex justify-content-center gap-3">
                    <router-link to="/login" class="btn btn-outline-light rounded-0 px-4 py-2">Log In</router-link>
                    <router-link to="/register" class="btn btn-outline-light rounded-0 px-4 py-2">Register</router-link>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            featuredServices: [],
            testimonials: [
                { 
                    name: "Rahul M.", 
                    rating: 5,
                    comment: "The plumber was professional and fixed my leaking faucet in no time. Great service!"
                },
                { 
                    name: "Priya S.", 
                    rating: 4,
                    comment: "Very responsive and the electrician knew exactly what the problem was. Would recommend."
                },
                { 
                    name: "Amit K.", 
                    rating: 5,
                    comment: "The cleaning service was thorough and they left my house spotless. Will definitely use again!"
                }
            ]
        }
    },
    mounted() {
        this.fetchFeaturedServices();
    },
    methods: {
        async fetchFeaturedServices() {
            try {
                const response = await fetch('/services');
                if (response.ok) {
                    const allServices = await response.json();
                    this.featuredServices = allServices.slice(0, 3);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        getServiceIcon(serviceName) {
            const serviceLower = serviceName.toLowerCase();
            
            if (serviceLower.includes('plumb')) {
                return '<div style="font-size: 40px;">🔧</div>';
            } else if (serviceLower.includes('electric')) {
                return '<div style="font-size: 40px;">⚡</div>';
            } else if (serviceLower.includes('clean')) {
                return '<div style="font-size: 40px;">🧹</div>';
            } else if (serviceLower.includes('cook')) {
                return '<div style="font-size: 40px;">👨‍🍳</div>';
            } else if (serviceLower.includes('repair')) {
                return '<div style="font-size: 40px;">🔨</div>';
            } else if (serviceLower.includes('laundry')) {
                return '<div style="font-size: 40px;">👕</div>';
            } else if (serviceLower.includes('emergency')) {
                return '<div style="font-size: 40px;">🚨</div>';
            } else if (serviceLower.includes('premium')) {
                return '<div style="font-size: 40px;">✨</div>';
            } else {
                return '<div style="font-size: 40px;">🏠</div>';
            }
        }
    }
}