<template>
  <div>
    <div>
      <MainLayout />
    </div>
  </div>
</template>

<script>
import MainLayout from '~/components/MainLayout/MainLayout.vue'

Vue.use(BootstrapVue)

@Component({
  components: {
    MainLayout
  }
})
export default class Index extends Vue {}

</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
