<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-projectname-id"
        label="Project name:"
        label-for="input-projectname"
      >
        <b-form-input
          id ="input-projectname"
          v-model="form.projectName"
          type="Project Name"
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
          type="Pitch"
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
    </b-form>
    <profileForm />
  </div>
</template>

<script lang="ts" src="./projectCreationForm.ts">
</script>
