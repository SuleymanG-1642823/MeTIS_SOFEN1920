<template>
  <div class="container">
    <div>
      <NameCard />
    </div>
  </div>
</template>

<script>
import NameCard from '~/components/NameCard/NameCard.vue'

export default {
  components: {
    NameCard
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
