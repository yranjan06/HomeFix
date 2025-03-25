export default {
    name: 'ServiceCard',
    props: {
      id: String,
      name: String,
      icon: Object,
      isActive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isHovered: false
      }
    },
    methods: {
      setHovered(value) {
        this.isHovered = value;
      }
    },
    template: `
      <router-link :to="'/service/' + id" class="text-decoration-none">
        <div
          class="relative rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white transition-all"
          :class="{ 'border border-primary': isActive }"
          @mouseenter="setHovered(true)"
          @mouseleave="setHovered(false)"
        >
          <div class="bg-primary p-3 text-center">
            <h3 class="text-white font-medium text-lg mb-0">{{ name }}</h3>
          </div>
          <div 
            class="flex items-center justify-center p-4 transition-all"
            :class="isHovered ? 'bg-gray-100' : 'bg-gray-200 bg-opacity-25'"
          >
            <div 
              class="text-primary transition-transform"
              :class="{ 'transform scale-110': isHovered }"
              style="width: 4rem; height: 4rem;"
            >
              <component :is="icon" />
            </div>
          </div>
        </div>
      </router-link>
    `
  }
  