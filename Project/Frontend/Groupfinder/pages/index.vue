<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <projectForm />
      <profileForm />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import projectForm from './../components/projectCreationForm/projectCreationForm.vue'

@ Component({
  components: { projectForm }
})
export default class Index extends Vue {}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
