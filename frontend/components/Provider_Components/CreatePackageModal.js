export default{
    template:`
  <div>
    <div class="modal fade" :class="{ 'show d-block': show }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isUpdate ? 'Update Package' : 'Create New Package' }}</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="name" 
                  v-model="formData.name" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="price" 
                  v-model.number="formData.price" 
                  min="0" 
                  step="0.01" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="duration" class="form-label">Duration</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="duration" 
                  v-model="formData.duration" 
                  placeholder="e.g. 2 hours" 
                  required
                >
              </div>
              
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea 
                  class="form-control" 
                  id="description" 
                  v-model="formData.description" 
                  rows="3" 
                  required
                ></textarea>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
                <button type="submit" class="btn btn-primary">{{ isUpdate ? 'Update' : 'Create' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="show"></div>
  </div>
</template>

<script>
export default {
  name: 'CreatePackageModal',
  props: {
    show: Boolean,
    initialData: Object,
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        price: 0,
        description: '',
        duration: ''
      }
    }
  },
  watch: {
    initialData: {
      handler(newValue) {
        if (newValue) {
          this.formData = { ...newValue }
        } else {
          this.resetForm()
        }
      },
      immediate: true
    }
  },
  methods: {
    resetForm() {
      this.formData = {
        name: '',
        price: 0,
        description: '',
        duration: ''
      }
    },
    handleSubmit() {
      if (!this.formData.name || !this.formData.description || !this.formData.duration || this.formData.price <= 0) {
        alert('Please fill all required fields with valid values')
        return
      }
      
      this.$emit('save', this.formData)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>`

}