// export default {
//   template: `
//   <div class="container mt-4">
//       <h2>Search Service Requests</h2>
//       <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
//       <DataTable :headers="headers" :rows="rows">
//           <template #actions="{ row }">
//               <StatusBadge :status="row.status" />
//               <button v-if="row.status === 'Requested'" @click="accept(row)" class="btn btn-sm btn-primary">Accept</button>
//               <button v-if="row.status === 'Completed'" @click="close(row)" class="btn btn-sm btn-success">Close</button>
//           </template>
//       </DataTable>
//   </div>
//   `,
//   data() {
//       return {
//           filters: [
//               { type: 'text', name: 'search_text', label: 'Search', placeholder: 'Search text', value: '' },
//               { type: 'select', name: 'pkgs', label: 'Package', options: [
//                   { value: '', label: 'Package' },
//               ], value: '' },
//               { type: 'select', name: 'status', label: 'Status', options: [
//                   { value: '', label: 'Status' },
//                   { value: 'Requested', label: 'Requested' },
//                   { value: 'Accepted', label: 'Accepted' },
//                   { value: 'Completed', label: 'Completed' },
//                   { value: 'Closed', label: 'Closed' },
//               ], value: '' },
//               { type: 'select', name: 'loc', label: 'Location', options: [
//                   { value: '', label: 'Location' },
//                   { value: 'Delhi', label: 'Delhi' },
//                   { value: 'Indore', label: 'Indore' },
//                   { value: 'Bangalore', label: 'Bangalore' },
//               ], value: '' },
//           ],
//           headers: ['ID', 'Package', 'Customer', 'Phone', 'Location', 'Pincode', 'Completion Date', 'Status', 'Action'],
//           rows: [],
//       };
//   },
//   methods: {
//       async handleSearch() {
//           try {
//               const response = await fetch('/api/search/requests', {
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
//               console.error('Error searching requests:', error);
//           }
//       },
//       handleReset() {
//           this.filters.forEach((filter) => (filter.value = ''));
//           this.rows = [];
//       },
//       async accept(row) {
//           try {
//               const response = await fetch(`/api/service-requests/${row.id}/accept`, {
//                   method: 'PUT',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authentication-Token': localStorage.getItem('token')
//                   }
//               });
//               const data = await response.json();
//               alert(data.message);
//               this.handleSearch();
//           } catch (error) {
//               console.error('Error accepting request:', error);
//           }
//       },
//       async close(row) {
//           try {
//               const response = await fetch(`/api/service-requests/${row.id}/close`, {
//                   method: 'PUT',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'Authentication-Token': localStorage.getItem('token')
//                   }
//               });
//               const data = await response.json();
//               alert(data.message);
//               this.handleSearch();
//           } catch (error) {
//               console.error('Error closing request:', error);
//           }
//       },
//   },
//   mounted() {
//       // Fetch packages for the package filter
//       fetch('/api/packages')
//           .then(response => response.json())
//           .then(data => {
//               this.filters.find(f => f.name === 'pkgs').options = [
//                   { value: '', label: 'Package' },
//                   ...data.map(pkg => ({ value: pkg.id, label: pkg.name }))
//               ];
//           });
//   }
// };




import SearchForm from '../components/SearchForm.js';
import DataTable from '../components/DataTable.js';
import StatusBadge from '../components/StatusBadge.js';

export default {
  components: { SearchForm, DataTable, StatusBadge },
  template: `
  <div class="container mt-4">
    <h2>Search Service Requests</h2>
    <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
    <DataTable :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <StatusBadge :status="row.status" />
        <button v-if="row.status === 'Requested'" @click="accept(row)" class="btn btn-sm btn-primary">Accept</button>
        <button v-if="row.status === 'Completed'" @click="close(row)" class="btn btn-sm btn-success">Close</button>
      </template>
    </DataTable>
  </div>
  `,
  data() {
    return {
      filters: [
        { type: 'text', name: 'search_text', label: 'Search', placeholder: 'Search text', value: '' },
        { type: 'select', name: 'pkgs', label: 'Package', options: [
          { value: '', label: 'Package' },
        ], value: '' },
        { type: 'select', name: 'status', label: 'Status', options: [
          { value: '', label: 'Status' },
          { value: 'Requested', label: 'Requested' },
          { value: 'Accepted', label: 'Accepted' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Closed', label: 'Closed' },
        ], value: '' },
        { type: 'select', name: 'loc', label: 'Location', options: [
          { value: '', label: 'Location' },
          { value: 'Delhi', label: 'Delhi' },
          { value: 'Indore', label: 'Indore' },
          { value: 'Bangalore', label: 'Bangalore' },
        ], value: '' },
      ],
      headers: ['ID', 'Package', 'Customer', 'Phone', 'Location', 'Pincode', 'Completion Date', 'Status', 'Action'],
      rows: [],
    };
  },
  methods: {
    handleSearch() {
      console.log('Searching with filters:', this.filters);
      // Use the /my-requests endpoint from the backend
      fetch('/my-requests', {
        headers: {
          'Authentication-Token': localStorage.getItem('token')
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Search results:', data);
          this.rows = data.map(req => ({
            id: req.id,
            package: req.package_name,
            customer: 'Customer',
            phone: 'Contact',
            location: 'Location',
            pincode: 'Pincode',
            completion_date: req.date_of_completion || 'Not completed',
            status: req.status
          }));
        })
        .catch(error => console.error('Error fetching requests:', error));
    },
    handleReset() {
      this.filters.forEach((filter) => (filter.value = ''));
      this.rows = [];
    },
    accept(row) {
      console.log('Accepting request for row:', row);
      // This would use the /update-request endpoint
      fetch(`/update-request/${row.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          status: 'accepted'
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Update response:', data);
          this.handleSearch(); // Refresh the list
        })
        .catch(error => console.error('Error updating request:', error));
    },
    close(row) {
      console.log('Closing request for row:', row);
      // This would use the /update-request endpoint
      fetch(`/update-request/${row.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          status: 'closed'
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Update response:', data);
          this.handleSearch(); // Refresh the list
        })
        .catch(error => console.error('Error updating request:', error));
    },
  },
  mounted() {
    // Fetch packages for the package filter
    fetch('/service-packages', {
      headers: {
        'Authentication-Token': localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.filters.find(f => f.name === 'pkgs').options = [
          { value: '', label: 'Package' },
          ...data.map(pkg => ({ value: pkg.id, label: pkg.name }))
        ];
      })
      .catch(error => console.error('Error fetching packages:', error));
  }
};
