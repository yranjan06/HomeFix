export default{
    template:`
  <div class="my-5" id="reviews">
    <div class="mb-4">
      <h2 class="text-2xl fw-bold text-danger">Reviews</h2>
    </div>

    <div class="row">
      <div v-if="reviews.length > 0" class="col-md-12">
        <div class="row">
          <div v-for="(review, index) in reviews" :key="index" class="col-md-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="mb-2">
                  <div class="text-sm fw-medium mb-1">Request ID - {{ review.service_id }}</div>
                  <div class="d-flex mb-1">
                    <span v-for="n in review.rating" :key="n" class="text-warning">⭐</span>
                  </div>
                  <p class="text-secondary">{{ review.comment }}</p>
                </div>
                <div class="text-end text-sm fst-italic text-muted">~ {{ review.customer_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="col-12 p-4 bg-light rounded text-center">
        <p>No reviews yet</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewsSection',
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.text-warning {
  color: #ffc107;
}
</style>`

}