<template>
  <div>
    <h1>User Page</h1>
    <UserData v-if="this.user" :user_prop="this.user" />
    <b-tabs card>
      <b-tab title="Projects" active>
        <ProjectsOfUser :userid_prop="1"/>
      </b-tab>
      <b-tab title="Skills">
        <b-card-text>Skills</b-card-text>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./userPage.ts">
</script>
