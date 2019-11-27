<template>
  <b-card :title="project.name" class="projectCard">
    <b-card-text> {{ profileMatches[0]['profileName'] }} {{ profileMatches[0]['matchingPercentile'] }} % match</b-card-text>
    <h5>Other profiles:</h5>
    <!-- Cards for the other profiles-->
    <b-card
      v-for="profileMatch in profileMatches.slice(1)"
      :key="profileMatch.id"
      class="profileCard"
    >
      <b-card-text>{{ profileMatch['profileName'] + ' ' + profileMatch['matchingPercentile'] + ' %' }}</b-card-text>
    </b-card>
  </b-card>
</template>

<script lang="ts" src="./RecommendedProjectCard.ts">
</script>

<style scoped>

.projectCard{
    margin: 15px 15px 15px 0;
}

</style>
