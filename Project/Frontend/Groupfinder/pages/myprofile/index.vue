<template>
  <div>
      <h1>My profile</h1>
      <UserData v-if="user" :user_prop="user" />
      <b-tooltip target="edit_data_btn" triggers="hover">Edit data</b-tooltip>
      <b-button v-b-modal.editData type="button" id="edit_data_btn" class="icon_button"><i class="fas fa-pen"></i></b-button>
      <EditUserData :user_prop="user" />
      <b-tabs id="myProfileNav" v-if="user" card>
      <b-tab title="Skills">
        <SkillsOfUser :userid_prop="user.id"/>
      </b-tab>
      <b-tab title="Categories">
        <EditPreferences :userID_prop="user.id" />
      </b-tab>
      <b-tab title="Projects">
        <ProjectsOfUser :userid_prop="user.id"/>
      </b-tab>
      <b-tab title="Settings">
        <h2>Change password</h2>
        <ChangePassword :userID_prop=user.id />
        <h2>Privacy settings <i id="help_icon" class="fas fa-info-circle"></i></h2>
         <b-tooltip target="help_icon" triggers="hover">
          If you choose to set your data protected, your mail, telephone number, zip and city will only be visible for teammembers.
        </b-tooltip>
        <b-form>
          <b-form-group label="I want my data to be visible for:">
            <b-form-radio v-model="private_data" name="not_private" :value=false>all users of the platform.</b-form-radio>
            <b-form-radio v-model="private_data" name="private" :value=true>all teammembers of the projects where I participate.</b-form-radio>
          </b-form-group>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" src="./myprofile.ts">
</script>

<style scoped>
  #help_icon{
    font-size: 20px;
  }
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
