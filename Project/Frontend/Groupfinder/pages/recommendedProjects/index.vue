<template>
  <div class="container">
    <div>
      <h1>Projects</h1>
      <b-form-input placeholder="Search projects"></b-form-input>
      <RecommendedProjectsList :projectMatches="recommendedProjects"/>
      <strong v-if="recommendedProjects == null || recommendedProjects.length === 0">
        There are no project that are compatible with your profile
      </strong>
    </div>
  </div>
</template>

<script lang="ts" src='./recommendedProjects.ts'>
</script>

<style scoped>

strong{
  margin: 40px auto;
  padding: 10px;
  text-align: center;
  color: rgb(88, 88, 88);
  font-size: 2rem;
  font-weight: bolder;
  display: block;
  width: 100%;
}

</style>
