// export default {
//     name: 'ServiceCard',
//     props: {
//       id: String,
//       name: String,
//       icon: Object,
//       isActive: {
//         type: Boolean,
//         default: false
//       }
//     },
//     data() {
//       return {
//         isHovered: false
//       }
//     },
//     methods: {
//       setHovered(value) {
//         this.isHovered = value;
//       }
//     },
//     template: `
//       <router-link :to="'/service/' + id" class="text-decoration-none">
//         <div
//           class="relative rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white transition-all"
//           :class="{ 'border border-primary': isActive }"
//           @mouseenter="setHovered(true)"
//           @mouseleave="setHovered(false)"
//         >
//           <div class="bg-primary p-3 text-center">
//             <h3 class="text-white font-medium text-lg mb-0">{{ name }}</h3>
//           </div>
//           <div 
//             class="flex items-center justify-center p-4 transition-all"
//             :class="isHovered ? 'bg-gray-100' : 'bg-gray-200 bg-opacity-25'"
//           >
//             <div 
//               class="text-primary transition-transform"
//               :class="{ 'transform scale-110': isHovered }"
//               style="width: 4rem; height: 4rem;"
//             >
//               <component :is="icon" />
//             </div>
//           </div>
//         </div>
//       </router-link>
//     `
//   }
  

// export default {
//   name: 'ServiceCard',
//   props: {
//     id: String,
//     name: String,
//     isActive: {
//       type: Boolean,
//       default: false
//     }
//   },
//   computed: {
//     iconClass() {
//       const serviceLower = this.name.toLowerCase();

//       if (serviceLower.includes('plumb')) {
//         return 'fas fa-wrench';
//       } else if (serviceLower.includes('electric')) {
//         return 'fas fa-bolt';
//       } else if (serviceLower.includes('clean')) {
//         return 'fas fa-broom';
//       } else if (serviceLower.includes('cook')) {
//         return 'fas fa-utensils';
//       } else if (serviceLower.includes('repair')) {
//         return 'fas fa-hammer';
//       } else if (serviceLower.includes('laundry')) {
//         return 'fas fa-tshirt';
//       } else if (serviceLower.includes('emergency')) {
//         return 'fas fa-exclamation-triangle';
//       } else if (serviceLower.includes('premium')) {
//         return 'fas fa-star';
//       } else {
//         return 'fas fa-home';
//       }
//     }
//   },
//   template: `
//     <router-link :to="'/service/' + id" class="text-decoration-none">
//       <div
//         class="relative rounded-lg overflow-hidden shadow-sm cursor-pointer bg-white transition-all"
//         :class="{ 'border border-primary': isActive }"
//         @mouseenter="isHovered = true"
//         @mouseleave="isHovered = false"
//       >
//         <div class="bg-primary p-3 text-center">
//           <h3 class="text-white font-medium text-lg mb-0">{{ name }}</h3>
//         </div>
//         <div 
//           class="flex items-center justify-center p-4 transition-all"
//           :class="isHovered ? 'bg-gray-100' : 'bg-gray-200 bg-opacity-25'"
//         >
//           <i :class="iconClass" class="text-primary text-4xl transition-transform" :class="{ 'transform scale-110': isHovered }"></i>
//         </div>
//       </div>
//     </router-link>
//   `
// }



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
