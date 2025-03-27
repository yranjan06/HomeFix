export default {
    template:`
  <div>
    <SearchForm :filters="filters" :onSubmit="handleSearch" :onReset="handleReset" />
    <DataTable :headers="headers" :rows="rows">
      <template #actions="{ row }">
        <BookingForm :onSubmit="() => book(row)" />
      </template>
    </DataTable>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import DataTable from '@/components/DataTable.vue';
import BookingForm from '@/components/BookingForm.vue';

export default {
  components: { SearchForm, DataTable, BookingForm },
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
    },
    handleReset() {
      this.filters.forEach((filter) => (filter.value = ''));
    },
    book(row) {
      console.log('Booking for row:', row);
    },
  },
};
</script>`

}
