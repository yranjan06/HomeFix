export default {
   
template:`
  <form @submit.prevent="onSubmit">
    <div v-for="filter in filters" :key="filter.name" class="filter">
      <label :for="filter.name">{{ filter.label }}</label>
      <template v-if="filter.type === 'text'">
        <input 
          :id="filter.name" 
          :name="filter.name" 
          :placeholder="filter.placeholder" 
          v-model="filter.value" />
      </template>
      <template v-else-if="filter.type === 'select'">
        <select :id="filter.name" :name="filter.name" v-model="filter.value">
          <option v-for="option in filter.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </template>
    </div>
    <button type="button" @click="onReset">Reset</button>
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
    onSubmit: {
      type: Function,
      required: true,
    },
    onReset: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.filter {
  margin-bottom: 1rem;
}
</style>`
}