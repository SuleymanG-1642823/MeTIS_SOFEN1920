<template>
  <div id="wrapper">
    <RecommendedUserCard
      v-for="(match, index) in mProfileUserMatches"
      :key="index"
      :profile="match.profile"
      :user-match="match.userMatch"
    />
  </div>
</template>

<script lang="ts" src="./RecommendedUsersList.ts">
</script>

<style scoped>

#wrapper{
    border: 2px solid rgba(0, 0, 0, 0.125);
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
}

</style>
