<template>
  <div>
    <RecommendedProjectCard
      v-for="projectMatch in projectMatches"
      :key="projectMatch.project.id"
      :project="projectMatch.project"
      :profileMatches="projectMatch.matches"
    />
  </div>
</template>

<script lang="ts" src="./RecommendedProjectsList.ts">
</script>
