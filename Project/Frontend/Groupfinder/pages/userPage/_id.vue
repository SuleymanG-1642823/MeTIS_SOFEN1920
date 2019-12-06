<template>
  <div>
    <h1>User Page</h1>
    <UserData v-if="this.user" :user_prop="this.user" />
    <b-tabs card>
      <b-tab title="Projects" active>
        <h3>List of projects</h3>
      </b-tab>
      <b-tab title="Skills">
        <h3>List of skills</h3>
      </b-tab>
      <b-tab title="Reviews">
        <h3>List of reviews</h3>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./userPage.ts">
</script>
