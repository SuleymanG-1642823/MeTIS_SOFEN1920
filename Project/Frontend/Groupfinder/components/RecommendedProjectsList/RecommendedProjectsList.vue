<template>
  <div id="cardContainer">
    <RecommendedProjectCard
      v-for="projectMatch in projectMatches"
      :key="projectMatch.project.id"
      :project="projectMatch.project"
      :profileMatches="projectMatch.matches"
    />
  </div>
</template>

<!-- Including script, don't write code here. -->
<script lang="ts" src="./RecommendedProjectsList.ts">
</script>

<!-- Style. -->
<style scoped>
#cardContainer{
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 16px;
}

@media (max-width: 1250px){
  #cardContainer{
    display: grid;
    grid-template-columns: 1fr;
  }
}

</style>
