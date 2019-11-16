<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@ Component({
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
