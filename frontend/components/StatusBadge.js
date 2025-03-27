export default {
    template:`
  <span :class="badgeClass">{{ status }}</span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    badgeClass() {
      switch (this.status.toLowerCase()) {
        case 'requested': return 'badge requested';
        case 'accepted': return 'badge accepted';
        case 'completed': return 'badge completed';
        case 'closed': return 'badge closed';
        default: return 'badge';
      }
    },
  },
};
</script>

<style scoped>
.badge {
  padding: 0.5em 1em;
  border-radius: 1rem;
  font-weight: bold;
}
.requested {
  background-color: #faf4a7;
}
.accepted {
  background-color: #edad95;
}
.completed {
  background-color: #e4f5b8;
}
.closed {
  background-color: #a4e0ae;
}
</style>`

}