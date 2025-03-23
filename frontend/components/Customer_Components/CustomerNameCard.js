export default {
    props: ['username'],
    template: `
    <div class="header">
        <div class="welcome-message">
            <h1>
                Welcome, <span class="username">{{ username }}</span>
            </h1>
        </div>
    </div>
    `,
    computed: {
        // You can add computed properties here if needed
        // For example:
        // displayName() {
        //     return this.username || 'Guest';
        // }
    },
    methods: {
        // You can add methods here if needed
    }
}