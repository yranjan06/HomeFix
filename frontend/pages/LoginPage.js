export default {
    template: `
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0">Login</h3>
                    </div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{ error }}</div>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    v-model="email" 
                                    class="form-control"
                                    required 
                                />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    v-model="password" 
                                    class="form-control"
                                    required 
                                />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                                    {{ loading ? 'Logging in...' : 'Login' }}
                                </button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
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
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                });
                
                // Redirect based on role
                const user = this.$store.getters.currentUser;
                if (user.role === 'admin') {
                    this.$router.push('/admin-dashboard');
                } else if (user.role === 'customer') {
                    this.$router.push('/customer-dashboard');
                } else if (user.role === 'service_provider') {
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