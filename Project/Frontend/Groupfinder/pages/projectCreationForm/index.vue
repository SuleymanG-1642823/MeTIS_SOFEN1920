<template>
  <div>
    <!-- TODO:FIX @submit="onSubmit" @reset="onReset" in b-form caused errors -->
    <b-form @submit="submitProject">
      <b-form-group
        id="input-projectname-id"
        label="Project name:"
        label-for="input-projectname"
      >
        <b-form-input
          id ="input-projectname"
          v-model="form.projectName"
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
          v-model="form.pitch"
          required
          placeholder="Enter a pitch for the project"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="input-category-id"
        label="Category"
        label-for="input-category"
      >
        <b-form-select
          id="input-category"
          v-model="form.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      <!-- Dynamically add profileForms -->
      <profileForm v-for="profile in listOfProfiles" v-bind:key="profile" @deleteProfile="deleteProfileForm" :profile="profile" />
      <b-button variant="primary" @click="addProfile">Add profile</b-button>

      <b-button type="submit" variant="success">Submit Project</b-button>
    </b-form>
  </div>
</template>

<script lang="ts" src="./projectCreationForm.ts">
</script>
