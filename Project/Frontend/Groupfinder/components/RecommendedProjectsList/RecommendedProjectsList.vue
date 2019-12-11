<template>
  <div id="cardContainer">
    <RecommendedProjectCard
      v-for="projectMatch in projectMatches"
      :key="projectMatch.project.id"
      :project="projectMatch.project"
      :profile-matches="projectMatch.matches"
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
}

/* Portrait and Landscape (mobile device) */
@media only screen
  and (min-device-width: 375px)
  and (max-device-width: 667px)
  and (-webkit-min-device-pixel-ratio: 2) {
    #cardContainer{
      display: grid;
      grid-template-columns: 1;
    }
}

@media (max-width: 900px){
  #cardContainer{
    display: grid;
    grid-template-columns: 100%;
  }
}

</style>
