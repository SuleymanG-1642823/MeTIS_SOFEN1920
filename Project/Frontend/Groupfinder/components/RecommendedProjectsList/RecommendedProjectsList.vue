<template>
  <div>
    <RecommendedProjectCard
      v-for="projectMatch in projectMatches"
      :key="projectMatch.project.id"
      v-bind:project="projectMatch.project"
      v-bind:profileMatches="projectMatch.matches"
    />
  </div>
</template>

<script lang="ts" src="./RecommendedProjectsList.ts">
</script>
