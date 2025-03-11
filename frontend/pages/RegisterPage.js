export default {
    template: `
    <div class="dark-theme">
        <div class="bg-gray-900 py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card bg-gray-800 border-0 rounded-0">
                            <div class="card-header bg-gray-900 text-white border-0 rounded-0">
                                <h3 class="mb-0 fw-light">Register</h3>
                            </div>
                            <div class="card-body p-4">
                                <div v-if="error" class="alert alert-danger rounded-0">{{ error }}</div>
                                <div v-if="success" class="alert alert-success rounded-0">{{ success }}</div>
                                
                                <!-- Boxed Tabs -->
                                <div class="row mb-4">
                                    <div class="col-6">
                                        <div @click="activeTab = 'customer'" 
                                             class="bg-gray-900 text-white p-3 text-center cursor-pointer h-100" 
                                             :class="{'border border-white': activeTab === 'customer'}">
                                            <div class="fs-5 fw-light">Customer</div>
                                            <div class="text-gray-400 mt-2">Looking for home services</div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div @click="activeTab = 'provider'" 
                                             class="bg-gray-900 text-white p-3 text-center cursor-pointer h-100" 
                                             :class="{'border border-white': activeTab === 'provider'}">
                                            <div class="fs-5 fw-light">Service Provider</div>
                                            <div class="text-gray-400 mt-2">Offering professional services</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <form @submit.prevent="handleSubmit">
                                    <!-- Common Fields -->
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="email" class="text-white fw-light mb-2">Email</label>
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    v-model="formData.email" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="password" class="text-white fw-light mb-2">Password</label>
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    v-model="formData.password" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="username" class="text-white fw-light mb-2">Username</label>
                                                <input 
                                                    type="text" 
                                                    id="username" 
                                                    v-model="formData.username" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="fullName" class="text-white fw-light mb-2">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    id="fullName" 
                                                    v-model="formData.full_name" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row g-3">
                                        <div class="col-md-12">
                                            <div class="form-group mb-3">
                                                <label for="address" class="text-white fw-light mb-2">Address</label>
                                                <input 
                                                    type="text" 
                                                    id="address" 
                                                    v-model="formData.address" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="pincode" class="text-white fw-light mb-2">Pincode</label>
                                                <input 
                                                    type="text" 
                                                    id="pincode" 
                                                    v-model="formData.pincode" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <label for="phone" class="text-white fw-light mb-2">Phone Number</label>
                                                <input 
                                                    type="text" 
                                                    id="phone" 
                                                    v-model="formData.phone_number" 
                                                    class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Service Provider Specific Fields -->
                                    <div v-if="activeTab === 'provider'" class="mt-4">
                                        <h5 class="text-white fw-light mb-3">Service Provider Details</h5>
                                        
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="service" class="text-white fw-light mb-2">Service</label>
                                                    <select 
                                                        id="service" 
                                                        v-model="formData.service_id" 
                                                        class="form-control bg-gray-900 text-white border-0 rounded-0"
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
                                                <div class="form-group mb-3">
                                                    <label for="experience" class="text-white fw-light mb-2">Years of Experience</label>
                                                    <select 
                                                        id="experience" 
                                                        v-model="formData.experience_years" 
                                                        class="form-control bg-gray-900 text-white border-0 rounded-0"
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
                                        
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="basePrice" class="text-white fw-light mb-2">Base Price (per hour)</label>
                                                    <input 
                                                        type="number" 
                                                        id="basePrice" 
                                                        v-model="formData.base_price" 
                                                        class="form-control bg-gray-900 text-white border-0 rounded-0"
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="document" class="text-white fw-light mb-2">Document Proof</label>
                                                    <div class="d-flex">
                                                        <input 
                                                            type="text" 
                                                            id="document" 
                                                            v-model="formData.document_proof" 
                                                            class="form-control bg-gray-900 text-white border-0 rounded-0 me-2"
                                                            placeholder="Document ID/Name" 
                                                            required 
                                                        />
                                                        <label for="document_file" class="btn btn-outline-light rounded-0 mb-0">
                                                            Upload
                                                        </label>
                                                        <input 
                                                            type="file" 
                                                            id="document_file" 
                                                            ref="document_file"
                                                            @change="handleFileUpload"
                                                            class="d-none" 
                                                        />
                                                    </div>
                                                    <small class="text-gray-400 mt-1 d-block" v-if="selectedFileName">
                                                        Selected: {{ selectedFileName }}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group mt-4">
                                        <button type="submit" class="btn btn-outline-light rounded-0 px-4 py-2 w-100" :disabled="loading">
                                            {{ loading ? 'Registering...' : 'Register' }}
                                        </button>
                                    </div>
                                </form>
                                
                                <div class="text-center mt-4">
                                    <p class="text-gray-400">Already have an account? <router-link to="/login" class="text-white">Login here</router-link></p>
                                </div>
                            </div>
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
            success: null,
            selectedFile: null,
            selectedFileName: ''
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
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
            this.selectedFileName = this.selectedFile ? this.selectedFile.name : '';
        },
        async handleSubmit() {
            this.loading = true;
            this.error = null;
            this.success = null;
            
            const endpoint = this.activeTab === 'customer' 
                ? '/register/customer' 
                : '/register/provider';
            
            try {
                // If there's a file, we need to use FormData instead of JSON
                let requestBody;
                let headers = {};
                
                if (this.selectedFile && this.activeTab === 'provider') {
                    requestBody = new FormData();
                    // Add all form fields to FormData
                    for (const key in this.formData) {
                        requestBody.append(key, this.formData[key]);
                    }
                    // Add the file
                    requestBody.append('document_file', this.selectedFile);
                } else {
                    requestBody = JSON.stringify(this.formData);
                    headers = {
                        'Content-Type': 'application/json'
                    };
                }
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: headers,
                    body: requestBody
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
                this.selectedFile = null;
                this.selectedFileName = '';
                
                if (this.$refs.document_file) {
                    this.$refs.document_file.value = '';
                }
                
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