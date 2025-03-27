export default {
  template: `
  <span :class="badgeClass">{{ status }}</span>
  `,
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    badgeClass() {
      switch (this.status.toLowerCase()) {
        case 'requested': return 'badge bg-warning text-dark';
        case 'accepted': return 'badge bg-info text-dark';
        case 'completed': return 'badge bg-primary';
        case 'closed': return 'badge bg-success';
        default: return 'badge bg-secondary';
      }
    },
  }
}
