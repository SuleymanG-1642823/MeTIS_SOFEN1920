<template>
  <div>
    <!-- TODO:FIX @submit="onSubmit" @reset="onReset" in b-form caused errors -->
    <b-form @submit="submitProject">
      <ProjectEdit :project="project" :formvalidationbools="formvalidationbools" @update_project="update_project"/>

      <b-button type="submit" variant="success">Submit Project</b-button>
    </b-form>
  </div>
</template>

<script lang="ts" src="./projectCreationForm.ts">
</script>
