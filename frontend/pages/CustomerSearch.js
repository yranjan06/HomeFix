// export default {
//   template: `
//   <div class="container mt-4">
//       <h2>Search Services</h2>
//       <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
//       <DataTable :headers="headers" :rows="rows">
//           <template #actions="{ row }">
//               <BookingForm :onSubmit="() => book(row)" />
//           </template>
//       </DataTable>
//   </div>
//   `,
//   data() {
//       return {
//           filters: [
//               { type: 'text', name: 'search_text', label: 'Search', placeholder: 'Search text', value: '' },
//               { type: 'select', name: 'pricef', label: 'Price', options: [
//                   { value: '', label: 'Price' },
//                   { value: '500', label: '0-500' },
//                   { value: '1000', label: '500-1000' },
//                   { value: '1500', label: '1000-1500' },
//                   { value: 'max', label: '1500+' },
//               ], value: '' },
//               { type: 'select', name: 'servicef', label: 'Service', options: [
//                   { value: '', label: 'Service' },
//               ], value: '' },
//               { type: 'select', name: 'xpf', label: 'Experience', options: [
//                   { value: '', label: 'Experience' },
//                   { value: '0-1', label: '0-1 years' },
//                   { value: '1-3', label: '1-3 years' },
//                   { value: '3-5', label: '3-5 years' },
//                   { value: '5-10', label: '5-10 years' },
//                   { value: '10+', label: '10+ years' },
//               ], value: '' },
//           ],
//           headers: ['ID', 'Service', 'Package', 'Professional', 'Experience', 'Price', 'Phone', 'Date-Time'],
//           rows: [],
//       };
//   },
//   methods: {
//       async handleSearch() {
//           try {
//               const response = await fetch('/api/search/services', {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authentication-Token': localStorage.getItem('token')
//                   },
//                   body: JSON.stringify(this.filters)
//               });
//               const data = await response.json();
//               this.rows = data.results;
//           } catch (error) {
//               console.error('Error searching services:', error);
//           }
//       },
//       handleReset() {
//           this.filters.forEach((filter) => (filter.value = ''));
//           this.rows = [];
//       },
//       async book(row) {
//           try {
//               const response = await fetch('/api/service-requests', {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authentication-Token': localStorage.getItem('token')
//                   },
//                   body: JSON.stringify({
//                       package_id: row.id,
//                       professional_id: row.professional_id
//                   })
//               });
//               const data = await response.json();
//               alert(data.message);
//           } catch (error) {
//               console.error('Error booking service:', error);
//           }
//       },
//   },
//   mounted() {
//       // Fetch services for the service filter
//       fetch('/api/services')
//           .then(response => response.json())
//           .then(data => {
//               this.filters.find(f => f.name === 'servicef').options = [
//                   { value: '', label: 'Service' },
//                   ...data.map(service => ({ value: service.id, label: service.name }))
//               ];
//           });
//   }
// };




import SearchForm from '../components/SearchForm.js';
import DataTable from '../components/DataTable.js';
import BookingForm from '../components/BookingForm.js';

export default {
  components: { SearchForm, DataTable, BookingForm },
  template: `
  <div class="container mt-4">
    <h2>Search Services</h2>
    <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
    <DataTable :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <BookingForm :onSubmit="() => book(row)" />
      </template>
    </DataTable>
  </div>
  `,
  data() {
    return {
      filters: [
        { type: 'text', name: 'search_text', label: 'Search', placeholder: 'Search text', value: '' },
        { type: 'select', name: 'pricef', label: 'Price', options: [
          { value: '', label: 'Price' },
          { value: '500', label: '0-500' },
          { value: '1000', label: '500-1000' },
          { value: '1500', label: '1000-1500' },
          { value: 'max', label: '1500+' },
        ], value: '' },
        { type: 'select', name: 'servicef', label: 'Service', options: [
          { value: '', label: 'Service' },
        ], value: '' },
        { type: 'select', name: 'xpf', label: 'Experience', options: [
          { value: '', label: 'Experience' },
          { value: '0-1', label: '0-1 years' },
          { value: '1-3', label: '1-3 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '5-10', label: '5-10 years' },
          { value: '10+', label: '10+ years' },
        ], value: '' },
      ],
      headers: ['ID', 'Service', 'Package', 'Professional', 'Experience', 'Price', 'Phone', 'Date-Time'],
      rows: [],
    };
  },
  methods: {
    handleSearch() {
      console.log('Searching with filters:', this.filters);
      // Use the /services endpoint from the backend
      fetch('/services')
        .then(response => response.json())
        .then(data => {
          console.log('Search results:', data);
          this.rows = data.map(service => ({
            id: service.id,
            service: service.name,
            package: service.description,
            professional: 'Available',
            experience: 'Varies',
            price: service.base_price,
            phone: 'Contact for details',
            datetime: new Date().toLocaleString()
          }));
        })
        .catch(error => console.error('Error fetching services:', error));
    },
    handleReset() {
      this.filters.forEach((filter) => (filter.value = ''));
      this.rows = [];
    },
    book(row) {
      console.log('Booking for row:', row);
      // This would use the /request-service endpoint
    },
  },
  mounted() {
    // Fetch services for the service filter
    fetch('/services')
      .then(response => response.json())
      .then(data => {
        this.filters.find(f => f.name === 'servicef').options = [
          { value: '', label: 'Service' },
          ...data.map(service => ({ value: service.id, label: service.name }))
        ];
      })
      .catch(error => console.error('Error fetching services:', error));
  }
};
