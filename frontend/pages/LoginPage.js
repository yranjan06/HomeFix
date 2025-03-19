export default {
    template: `
    <div class="bg-gray-900 py-5" style="min-height: calc(100vh - 76px);">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card border-0 rounded-0 bg-gray-800">
                        <div class="card-body p-4">
                            <h2 class="text-center mb-4 fw-light text-white">Login</h2>
                            <div v-if="error" class="alert alert-danger rounded-0 border-0 bg-danger bg-opacity-25 text-white">{{ error }}</div>
                            
                            <form @submit.prevent="handleSubmit">
                                <div class="mb-3">
                                    <label for="email" class="form-label text-gray-400">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        v-model="email" 
                                        class="form-control bg-gray-900 border-0 rounded-0 text-white"
                                        required 
                                    />
                                </div>
                                
                                <div class="mb-3">
                                    <label for="password" class="form-label text-gray-400">Password</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        v-model="password" 
                                        class="form-control bg-gray-900 border-0 rounded-0 text-white"
                                        required 
                                    />
                                </div>
                                
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input bg-gray-900 border-light rounded-0" id="rememberMe">
                                    <label class="form-check-label text-gray-400" for="rememberMe">Remember me</label>
                                </div>
                                
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-outline-light rounded-0 py-2" :disabled="loading">
                                        {{ loading ? 'Logging in...' : 'Login' }}
                                    </button>
                                </div>
                            </form>
                            
                            <div class="text-center mt-4">
                                <p class="mb-0 text-gray-400">Don't have an account? <router-link to="/register" class="text-white">Register here</router-link></p>
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
            email: '',
            password: '',
            loading: false,
            error: null
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }
                
                this.$store.commit('setUser', data);
                
                // Redirect based on role
                if (data.role === 'admin') {
                    this.$router.push('/admin-dashboard');
                } else if (data.role === 'customer') {
                    this.$router.push('/customer-dashboard');
                } else if (data.role === 'service_provider') {
                    this.$router.push('/provider-dashboard');
                } else {
                    this.$router.push('/');
                }
                
            } catch (error) {
                this.error = error.message || 'Failed to login. Please check your credentials.';
            } finally {
                this.loading = false;
            }
        }
    }
}

