<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <projectForm />
      <profileForm />
      <div id="sidebarProjectsDiv" class="mt-3">
        <SidebarProjects />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import projectForm from './../components/projectCreationForm/projectCreationForm.vue'
import SidebarProjects from '~/components/SidebarProjects/SidebarProjects.vue'

@ Component({
  components: { projectForm, SidebarProjects }
})
export default class Index extends Vue {}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}

#sidebarProjectsDiv{
  background-color: blue;
  height: 200px;
  width: 100px;
  position: relative;
}
</style>
