<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <RecommendedProjectsList :project-matches="myData" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

@Component({
  components: {
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
