// NameCard.js

export default {
    props: ['username'],
    template: `
    <div class="customer-welcome-card mt-4 ms-4 d-inline-block p-3 bg-dark border border-secondary rounded">
        <h3 class="text-white mb-0">Welcome, {{ displayUsername }}</h3>
    </div>
    `,
    computed: {
        displayUsername() {
            // Use prop if provided, otherwise get from store
            if (this.username) {
                return this.username;
            }
            
            // Get username from store
            const user = this.$store.getters.currentUser;
            return user && user.username ? user.username : 'Guest';
        }
    }
}
