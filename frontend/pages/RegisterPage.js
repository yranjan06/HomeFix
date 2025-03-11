export default {
    template: `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0">Register</h3>
                    </div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{ error }}</div>
                        <div v-if="success" class="alert alert-success">{{ success }}</div>
                        
                        <ul class="nav nav-tabs mb-4">
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: activeTab === 'customer' }" 
                                   @click="activeTab = 'customer'">Customer</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: activeTab === 'provider' }" 
                                   @click="activeTab = 'provider'">Service Provider</a>
                            </li>
                        </ul>
                        
                        <form @submit.prevent="handleSubmit">
                            <!-- Common Fields -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            v-model="formData.email" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input 
                                            type="password" 
                                            id="password" 
                                            v-model="formData.password" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input 
                                            type="text" 
                                            id="username" 
                                            v-model="formData.username" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="fullName">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="fullName" 
                                            v-model="formData.full_name" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <input 
                                            type="text" 
                                            id="address" 
                                            v-model="formData.address" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="pincode">Pincode</label>
                                        <input 
                                            type="text" 
                                            id="pincode" 
                                            v-model="formData.pincode" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="phone">Phone Number</label>
                                        <input 
                                            type="text" 
                                            id="phone" 
                                            v-model="formData.phone_number" 
                                            class="form-control"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Service Provider Specific Fields -->
                            <div v-if="activeTab === 'provider'">
                                <h5 class="mt-4 mb-3">Service Provider Details</h5>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="service">Service</label>
                                            <select 
                                                id="service" 
                                                v-model="formData.service_id" 
                                                class="form-control"
                                                required
                                            >
                                                <option value="">Select a service</option>
                                                <option v-for="service in services" :key="service.id" :value="service.id">
                                                    {{ service.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="experience">Years of Experience</label>
                                            <select 
                                                id="experience" 
                                                v-model="formData.experience_years" 
                                                class="form-control"
                                                required
                                            >
                                                <option value="">Select experience</option>
                                                <option value="0-1">Less than 1 year</option>
                                                <option value="1-3">1-3 years</option>
                                                <option value="3-5">3-5 years</option>
                                                <option value="5-10">5-10 years</option>
                                                <option value="10+">10+ years</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="basePrice">Base Price (per hour)</label>
                                            <input 
                                                type="number" 
                                                id="basePrice" 
                                                v-model="formData.base_price" 
                                                class="form-control"
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="document">Document Proof</label>
                                            <input 
                                                type="text" 
                                                id="document" 
                                                v-model="formData.document_proof" 
                                                class="form-control"
                                                placeholder="Document ID/Name" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group mt-4">
                                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                                    {{ loading ? 'Registering...' : 'Register' }}
                                </button>
                            </div>
                        </form>
                        
                        <div class="text-center mt-3">
                            <p>Already have an account? <router-link to="/login">Login here</router-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            activeTab: 'customer',
            formData: {
                email: '',
                password: '',
                username: '',
                full_name: '',
                address: '',
                pincode: '',
                phone_number: '',
                service_id: '',
                experience_years: '',
                base_price: '',
                document_proof: ''
            },
            services: [],
            loading: false,
            error: null,
            success: null
        }
    },
    mounted() {
        this.fetchServices();
    },
    methods: {
        async fetchServices() {
            try {
                const response = await fetch('/services');
                if (response.ok) {
                    this.services = await response.json();
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        async handleSubmit() {
            this.loading = true;
            this.error = null;
            this.success = null;
            
            const endpoint = this.activeTab === 'customer' 
                ? '/register/customer' 
                : '/register/provider';
            
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }
                
                this.success = 'Registration successful! You can now log in.';
                
                // Reset form
                this.formData = {
                    email: '',
                    password: '',
                    username: '',
                    full_name: '',
                    address: '',
                    pincode: '',
                    phone_number: '',
                    service_id: '',
                    experience_years: '',
                    base_price: '',
                    document_proof: ''
                };
                
                // Redirect to login after a delay
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);
                
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
}