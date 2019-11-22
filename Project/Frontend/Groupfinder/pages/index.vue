<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <projectFormComponent></projectFormComponent>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import projectForm from './../components/projectCreationForm/projectCreationForm.vue'

@ Component({
  components: {
    projectFormComponent: projectForm
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
