export default{
    template:`
  <div :class="['alert', `alert-${alertClass}`, 'mb-4']" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'FlashMessage',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['success', 'error', 'info'].includes(value)
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    alertClass() {
      const map = {
        success: 'success',
        error: 'danger',
        info: 'info'
      }
      return map[this.type] || 'info'
    }
  }
}
</script>`

}