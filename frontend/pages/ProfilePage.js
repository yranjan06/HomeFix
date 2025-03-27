export default {
    template: `
    <div class="container py-5">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card shadow-sm">
                    <div class="card-header bg-gray-900 text-white">
                        <h4 class="mb-0">Profile Settings</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="updateProfile">
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" v-model="form.name">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="form.email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone Number</label>
                                <input type="text" class="form-control" v-model="form.phone_number">
                            </div>
                            <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" @click="resetForm">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            form: {
                name: '',
                email: '',
                phone_number: ''
            },
            originalForm: {}
        }
    },
    mounted() {
        this.getUserProfile();
    },
    methods: {
        getUserProfile() {
            // Get user data from store or fetch from API
            const user = this.$store.getters.currentUser;
            if (user) {
                this.form.name = user.name || '';
                this.form.email = user.email || '';
                this.form.phone_number = user.phone_number || '';
                this.originalForm = {...this.form};
            }
        },
        updateProfile() {
            // Call API to update profile
            fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.$store.state.auth_token}`
                },
                body: JSON.stringify(this.form)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update store with new user data
                    this.$store.commit('updateUserProfile', this.form);
                    alert('Profile updated successfully');
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
        },
        resetForm() {
            this.form = {...this.originalForm};
        }
    }
}
