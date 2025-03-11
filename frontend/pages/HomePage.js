export default {
    template: `
    <div>
        <!-- Hero Section -->
        <div class="jumbotron jumbotron-fluid bg-primary text-white">
            <div class="container text-center">
                <h1 class="display-4">Welcome to HomeFix</h1>
                <p class="lead">Your one-stop solution for all home service needs</p>
                <hr class="my-4">
                <p>Find trusted professionals for plumbing, electrical work, cleaning, and more!</p>
                <div>
                    <router-link to="/login" class="btn btn-light btn-lg mr-2">Customer Login</router-link>
                    <router-link to="/register" class="btn btn-outline-light btn-lg">Join as Provider</router-link>
                </div>
            </div>
        </div>

        <!-- Services Section -->
        <div class="container my-5">
            <h2 class="text-center mb-4">Our Services</h2>
            <div class="row">
                <div v-for="service in featuredServices" :key="service.id" class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <div class="service-icon mb-3" v-html="getServiceIcon(service.name)"></div>
                            <h5 class="card-title">{{ service.name }}</h5>
                            <p class="card-text">{{ service.description }}</p>
                            <p class="text-primary font-weight-bold">Starting from ₹{{ service.base_price }}</p>
                            <router-link :to="'/services/' + service.id" class="btn btn-primary">View Details</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-4">
                <router-link to="/services" class="btn btn-outline-primary">View All Services</router-link>
            </div>
        </div>

        <!-- How It Works Section -->
        <div class="bg-light py-5">
            <div class="container">
                <h2 class="text-center mb-5">How It Works</h2>
                <div class="row text-center">
                    <div class="col-md-4 mb-4">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                            <h3>1</h3>
                        </div>
                        <h4>Choose a Service</h4>
                        <p>Browse through our wide range of professional services</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                            <h3>2</h3>
                        </div>
                        <h4>Book an Appointment</h4>
                        <p>Select a professional and schedule a convenient time</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px;">
                            <h3>3</h3>
                        </div>
                        <h4>Get the Job Done</h4>
                        <p>Relax while our professionals handle your requirements</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Join as Provider Section -->
        <div class="bg-dark text-white py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-7">
                        <h2>Join as a Service Provider</h2>
                        <p class="lead">Are you skilled in home services? Join our platform and grow your business.</p>
                        <ul class="list-unstyled mt-3">
                            <li class="mb-2">✓ Get more customers</li>
                            <li class="mb-2">✓ Flexible working hours</li>
                            <li class="mb-2">✓ Easy payment collection</li>
                        </ul>
                        <router-link to="/register" class="btn btn-outline-light btn-lg mt-3">Register Now</router-link>
                    </div>
                    <div class="col-md-5 text-center mt-4 mt-md-0">
                        <div v-html="getProviderImage()"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Testimonials Section -->
        <div class="container my-5">
            <h2 class="text-center mb-4">What Our Customers Say</h2>
            <div class="row">
                <div v-for="(testimonial, index) in testimonials" :key="index" class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <p class="card-text font-italic">"{{ testimonial.comment }}"</p>
                            <div class="d-flex align-items-center mt-3">
                                <div class="font-weight-bold">{{ testimonial.name }}</div>
                                <div class="ml-auto">
                                    <span v-for="n in 5" :key="n" class="text-warning">
                                        {{ n <= testimonial.rating ? '★' : '☆' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Call to Action -->
        <div class="bg-primary text-white py-5">
            <div class="container text-center">
                <h2>Ready to get started?</h2>
                <p class="lead">Join thousands of satisfied customers today</p>
                <div>
                    <router-link to="/login" class="btn btn-light btn-lg mr-3">Customer Login</router-link>
                    <router-link to="/register" class="btn btn-outline-light btn-lg">Provider Registration</router-link>
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
                    // Take just the first 3 services for featuring on homepage
                    this.featuredServices = allServices.slice(0, 3);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        // Fixed method to get service icons that works
        getServiceIcon(serviceName) {
            const serviceLower = serviceName.toLowerCase();
            
            // Simple emoji icons instead of SVGs for better compatibility
            if (serviceLower.includes('plumb')) {
                return '<div style="font-size: 48px; color: #007bff;">🔧</div>';
            } else if (serviceLower.includes('electric')) {
                return '<div style="font-size: 48px; color: #007bff;">⚡</div>';
            } else if (serviceLower.includes('clean')) {
                return '<div style="font-size: 48px; color: #007bff;">🧹</div>';
            } else if (serviceLower.includes('cook')) {
                return '<div style="font-size: 48px; color: #007bff;">👨‍🍳</div>';
            } else if (serviceLower.includes('repair')) {
                return '<div style="font-size: 48px; color: #007bff;">🔨</div>';
            } else if (serviceLower.includes('laundry')) {
                return '<div style="font-size: 48px; color: #007bff;">👕</div>';
            } else if (serviceLower.includes('emergency')) {
                return '<div style="font-size: 48px; color: #007bff;">🚨</div>';
            } else if (serviceLower.includes('premium')) {
                return '<div style="font-size: 48px; color: #007bff;">✨</div>';
            } else {
                // Default icon for any other service
                return '<div style="font-size: 48px; color: #007bff;">🏠</div>';
            }
        },
        // Provider image with SVG
        getProviderImage() {
            // Use emoji approach for better compatibility
            return `
            <div style="background-color: #343a40; border-radius: 8px; width: 300px; height: 200px; margin: 0 auto; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">
                <div style="position: absolute; top: 20px; right: 20px; background-color: #28a745; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-size: 24px;">✓</div>
                <div style="position: absolute; top: 20px; left: 20px; background-color: #007bff; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-size: 24px;">+</div>
                <div style="font-size: 72px; margin-bottom: 10px;">👨‍🔧</div>
                <div style="background-color: #007bff; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold; text-align: center;">Service Provider</div>
            </div>
            `;
        }
        
        
    }
}
