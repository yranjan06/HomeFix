export default {
    template:`
  <form @submit.prevent="onSubmit">
    <input type="date" v-model="date" required />
    <input type="time" v-model="time" required />
    <button type="submit">Book</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      time: '',
    };
  },
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
}
</style>`
}