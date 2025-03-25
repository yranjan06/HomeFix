import NameCard from '../components/NameCard.js';
import ServiceCard from '../components/Customer_Components/ServiceCard.js';

export default {
    components: {
        NameCard,
        ServiceCard
        
    },
    computed: {
        username() {
            // Retrieve username from Vuex store
            return this.$store.getters.currentUser ? this.$store.getters.currentUser.username : 'Guest';
        }
    },
    template: `
    <div>
        <NameCard :username="username" />
    </div>
    `
};



