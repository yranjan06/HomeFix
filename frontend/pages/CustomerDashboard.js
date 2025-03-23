// CustomerNameCard.js

export default {
    props: ['username'],
    template: `
    <div class="customer-welcome-card mt-4 ms-4 d-inline-block p-3 bg-dark border border-secondary rounded">
        <h3 class="text-white mb-0">Welcome, {{ username }}</h3>
    </div>
    `,
    mounted() {
        // If you need to fetch the username from an API
        // this.fetchUsername();
    },
    methods: {
        // Example method to fetch username if needed
        fetchUsername() {
            // Fetch logic here
            // this.$emit('username-loaded', fetchedUsername);
        }
    }
}