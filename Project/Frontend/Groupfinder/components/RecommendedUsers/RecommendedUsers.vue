<template>
  <div id="wrapper">
    <RecommendedUserCard
      v-for="(match, index) in getVariantMatches()"
      :key="index"
      :profile="match.profile"
      :user-match="match.userMatch"
    />
  </div>
</template>

<script lang="ts" src="./RecommendedUsers.ts">
</script>

<style scoped>

#wrapper{
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
}

/* When width is less that 675px make two rows of the footer */
@media (max-width: 1750px) {
  #wrapper{
    grid-template-columns: 1fr;
  }
}

</style>
