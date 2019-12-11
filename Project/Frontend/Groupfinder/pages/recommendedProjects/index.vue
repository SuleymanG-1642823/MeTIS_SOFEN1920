<template>
  <div class="container">
    <div>
      <h1>Projects</h1>
      <b-form-input placeholder="Search projects" />
      <RecommendedProjectsList :project-matches="recommendedProjects" />
    </div>
  </div>
</template>

<script lang="ts" src='./recommendedProjects.ts'>
</script>
