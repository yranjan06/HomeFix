import welcomeHeader from '../components/customer_component/welcomeHeader.js';
import serviceCategoryGrid from '../components/customer_component/serviceCategoryGrid.js';
import serviceHistoryTable from '../components/customer_component/serviceHistoryTable.js';

export default {
    template: `
    <div class="dashboard container py-4">
        <welcome-header :username="username" />
        
        <service-category-grid />
        
        <service-history-table />
    </div>
    `,
    components: {
        'welcome-header': welcomeHeader,
        'service-category-grid': serviceCategoryGrid,
        'service-history-table': serviceHistoryTable
    },
    data() {
        return {
            username: '',
            userData: {}
        };
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
};
