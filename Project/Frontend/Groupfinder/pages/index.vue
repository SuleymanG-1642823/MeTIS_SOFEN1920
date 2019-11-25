<template>
  <div>
    <div>
      <MainLayout />
    </div>
  </div>
</template>

<script>
import MainLayout from '~/components/MainLayout/MainLayout.vue'

export default {
  components: {
    MainLayout
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
