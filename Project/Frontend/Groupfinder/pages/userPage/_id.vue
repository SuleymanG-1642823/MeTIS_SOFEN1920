<template>
  <div>
    <h1>User Page</h1>
    <UserData v-if="this.user" :user_prop="this.user" />
    <b-tabs card>
      <b-tab title="Projects" active>
        <ProjectsOfUser v-if="this.user" :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Skills">
        <SkillsOfUser v-if="this.user" :userid_prop="this.user.id"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./userPage.ts">
</script>
