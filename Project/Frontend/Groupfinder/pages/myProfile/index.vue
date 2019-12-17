<template>
  <div>
      <h1>My profile</h1>
      <UserData v-if="this.user" :user_prop="this.user" />
      <b-tooltip target="edit_data_btn" triggers="hover">Edit data</b-tooltip>
      <b-button v-b-modal.editData type="button" id="edit_data_btn" class="icon_button"><i class="fas fa-pen"></i></b-button>
      <EditUserData :user_prop="this.user" />
      <b-tabs id="myProfileNav" v-if="this.user" card>
      <b-tab title="Projects" active>
        <ProjectsOfUser :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Skills">
        <SkillsOfUser :userid_prop="this.user.id"/>
      </b-tab>
      <b-tab title="Settings">
        <h2>Change password</h2>
        <ChangePassword :userID_prop=this.user.id />
        <h2>Privacy settings</h2>
        <p>TODO: privacy settings</p>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./myProfile.ts">
</script>

<style scoped>
  #myProfileNav{
    margin-top: 100px;
  }
  .icon_button{
      width: 50px;
      height: 50px;
      border-radius: 35px;
      font-size: 20px;
  }
  #edit_data_btn{
      float: right
  }
</style>
