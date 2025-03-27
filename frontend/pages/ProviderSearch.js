export default {
    template:`
  <div>
    <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
    <DataTable :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <StatusBadge :status="row.status" />
        <button v-if="row.status === 'Requested'" @click="accept(row)">Accept</button>
        <button v-if="row.status === 'Completed'" @click="close(row)">Close</button>
      </template>
    </DataTable>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import DataTable from '@/components/DataTable.vue';
import StatusBadge from '@/components/StatusBadge.vue';

export default {
  components: { SearchForm, DataTable, StatusBadge },
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
    },
    handleReset() {
      this.filters.forEach((filter) => (filter.value = ''));
    },
    accept(row) {
      console.log('Accepting request for row:', row);
    },
    close(row) {
      console.log('Closing request for row:', row);
    },
  },
};
</script>`
}
