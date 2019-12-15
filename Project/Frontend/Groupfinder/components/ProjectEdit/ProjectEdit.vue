<template>
<div>
    <b-form-group
        id="input-projectname-id"
        label="Project name:"
        label-for="input-projectname"
      >
        <b-form-input
          id ="input-projectname"
          v-model="project.name"
          required
          placeholder="Enter a project name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-pitch-id"
        label="Pitch"
        label-for="input-pitch"
      >
        <b-form-textarea
          id="input-pitch"
          v-model="project.pitch"
          required
          placeholder="Enter a pitch for the project"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group>
        <CategoryComponent v-for="(category, index) in categories_input" v-bind:key="index" :category="category" />
      </b-form-group>
    <!-- Dynamically add profileForms -->
    <profileForm v-for="(profile, index) in project.profiles" v-bind:key="index" @deleteProfile="deleteProfileForm" :profile="profile"/>
    <b-button class="my-2" variant="primary" @click="addProfile">Add profile</b-button>
</div>
</template>

<script lang="ts" src="./ProjectEdit.ts">
</script>
