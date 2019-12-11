<template>
  <div>
      <h1>My profile</h1>
      <UserData v-if="this.user" :user_prop="this.user" />
      <b-tabs v-if="this.user" card>
      <b-tab title="Projects" active>
        <ProjectsOfUser :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Skills">
        <SkillsOfUser :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Settings">
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./myProfile.ts">
</script>
