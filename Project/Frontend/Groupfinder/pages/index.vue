<template>
  <div>
    <div>
      <MainLayout />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import MainLayout from '~/components/MainLayout/MainLayout.vue'

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
