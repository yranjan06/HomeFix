export default {
  name: 'ServiceCard',
  props: {
    id: {
      type: [String, Number],  // Accept both types
      required: true
    },
    name: String,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass() {
      const serviceLower = this.name.toLowerCase();

      if (serviceLower.includes('plumb')) return 'fas fa-wrench';
      if (serviceLower.includes('electric')) return 'fas fa-bolt';
      if (serviceLower.includes('clean')) return 'fas fa-broom';
      if (serviceLower.includes('cook')) return 'fas fa-utensils';
      if (serviceLower.includes('repair')) return 'fas fa-hammer';
      if (serviceLower.includes('laundry')) return 'fas fa-tshirt';
      return 'fas fa-home';
    }
  },
  template: `
    <router-link :to="'/service/' + id" class="text-decoration-none">
      <div class="d-flex flex-column align-items-center justify-content-center p-3 bg-dark text-white rounded border border-secondary transition"
           style="width: 150px; height: 150px; aspect-ratio: 1/1;"
           @mouseenter="$event.currentTarget.classList.add('border-white')"
           @mouseleave="$event.currentTarget.classList.remove('border-white')">
        <i :class="iconClass" class="text-white fs-3 mb-2"></i>
        <span class="fs-6 text-center">{{ name }}</span>
      </div>
    </router-link>
  `
}
