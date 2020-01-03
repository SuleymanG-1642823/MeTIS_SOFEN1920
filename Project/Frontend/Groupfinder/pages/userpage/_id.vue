<template>
  <div>
    <UserData v-if="this.user" :user_prop="this.user" />
    <b-tabs id="profile_nav" card>
      <b-tab title="Skills">
        <SkillsOfUser v-if="this.user" :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Projects">
        <ProjectsOfUser v-if="this.user" :userid_prop="this.user.id"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./userpage.ts">
</script>

<style scoped>
  #profile_nav{
    margin-top: 60px;
  }
</style>
