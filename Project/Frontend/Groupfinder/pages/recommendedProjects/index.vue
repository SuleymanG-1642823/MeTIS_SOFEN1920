<template>
  <div class="container">
    <div>
      <h1>Projects</h1>
      <b-form-input placeholder="Search projects"></b-form-input>
      <RecommendedProjectsList v-bind:projectMatches="recommendedProjects" />
    </div>
  </div>
</template>

<script lang="ts" src='./recommendedProjects.ts'>
</script>
