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
                <router-link to="/services" class="btn btn-light btn-lg mr-2">Explore Services</router-link>
                <router-link to="/register" class="btn btn-outline-light btn-lg">Join as Provider</router-link>
            </div>
        </div>

        <!-- Services Section -->
        <div class="container my-5">
            <h2 class="text-center mb-4">Our Services</h2>
            <div class="row">
                <div v-for="service in featuredServices" :key="service.id" class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
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
                                        <i :class="n <= testimonial.rating ? 'fas fa-star' : 'far fa-star'">★</i>
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
                <router-link to="/register" class="btn btn-light btn-lg mt-3">Sign Up Now</router-link>
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
        }
    }
}