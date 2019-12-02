<template>
<div>
<b-card class="mb-2">
  <!-- TODO: FIX error on  @submit="onSubmit" @reset="onReset" -->
  <b-form>
    <!-- Profile name input -->
    <b-form-group
      id="input-profilename-id"
      label="Profile name:"
      label-for="input-profilename"
    >
      <!-- Error on: v-model="form.profileName"
        Please fix -->
      <b-form-input
        id ="input-profilename"
        required
        placeholder="Enter a profile name"
        v-model="profile.name"
      ></b-form-input>
    </b-form-group>

    <!-- skill input -->
    <b-form-group id="input-skill-id" label="Skills:" label-for="input-skill">
      <b-input-group>
        <b-form-input v-model="skill_input" id="input-skill" placeholder="Enter skill"></b-form-input>
        <b-input-group-append>
          <b-button @click="addSkill(skill_input)" variant="primary">Add</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul>
        <li v-for="(skill, index) in profile.skills" v-bind:key="index" class="py-1">
          {{profile.skills[index]}}
          <b-button @click="deleteSkillFromIndex(index)" variant="outline-danger" size="sm">Delete</b-button>
        </li>
      </ul>
    </b-form-group>

  </b-form>

  <b-button @click="deleteProfileFromList()" variant="outline-danger" size="sm">Delete Profile</b-button>
</b-card>
</div>
</template>

<script lang="ts" src="./profileForm.ts">
</script>
