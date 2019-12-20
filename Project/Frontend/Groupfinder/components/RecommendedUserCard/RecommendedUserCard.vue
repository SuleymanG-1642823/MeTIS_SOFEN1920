<template>
  <b-card id="root">
    <div v-if="!dataReceived()">
      <p>Mandatory props have no data passed to them.</p>
    </div>
    <div v-if="dataReceived()" id="contentDiv">
      <h3>{{mUserMatch.user.first_name + ' ' + mUserMatch.user.last_name}}</h3>
      <span>{{mUserMatch.matchingPercentage}}%</span>
      <b-badge>{{mProfile.name}}</b-badge>
    </div>
  </b-card>
</template>

<script lang="ts" src="./RecommendedUserCard.ts">
</script>

<style scoped>
#root{
    margin-bottom: 10px;
}

.card-body{
    padding: 10px;
}
</style>
