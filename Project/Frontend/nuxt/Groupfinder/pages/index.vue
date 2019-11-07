<template>
  <div class="container">
    <div>
      <NameCard :user="{first_name: 'Liese', last_name: 'Bekkers', email: 'liese.bekkers@student.uhasselt.be'}" />
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
