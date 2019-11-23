<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-group
      id="input-profilename-id"
      label="Project name:"
      label-for="input-profilename"
    >
      <b-form-input
        id ="input-profilename"
        v-model="form.profileName"
        type="Profile name"
        required
        placeholder="Enter a profile name"
      ></b-form-input>
    </b-form-group>
  </b-form>
</template>

<script lang="ts" src="./profileForm.ts">
</script>
