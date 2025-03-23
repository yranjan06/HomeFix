export default {
    template: `
    <div class="dashboard container py-4">
        <welcome-header :username="username" />
        
        <service-category-grid />
        
        <promotion-banner 
            promotionText="Get our Platinum plan"
            iconSrc="/img/platinum-icon.png"
        />
        
        <service-history-table />
    </div>
    `,
    components: {
        'welcome-header': () => import('./welcomeHeader.js'),
        'service-category-grid': () => import('./serviceCategoryGrid.js'),
        'promotion-banner': () => import('./promotionBanner.js'),
        'service-history-table': () => import('./serviceHistoryTable.js')
    },
    data() {
        return {
            username: '',
            userData: {}
        }
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await fetch('/api/user/profile');
                if (response.ok) {
                    this.userData = await response.json();
                    this.username = this.userData.username || this.userData.full_name || 'User';
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }
}