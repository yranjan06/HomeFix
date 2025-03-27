export default {
  template: `
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
        <th v-if="$slots.actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        <td v-if="$slots.actions">
          <slot name="actions" :row="row"></slot>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  }
}
