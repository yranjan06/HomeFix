export default {
  template: `
  <form @submit.prevent="onSubmit">
    <input type="date" v-model="date" required />
    <input type="time" v-model="time" required />
    <button type="submit">Book</button>
  </form>
  `,
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
  }
}
