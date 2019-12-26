<template>
  <div>
    <b-form @submit="submitProject">
      <ProjectEdit :project="project" @update_project="update_project"/>

      <b-button type="submit" variant="success">Submit Project</b-button>
    </b-form>
  </div>
</template>

<script lang="ts" src="./projectCreationForm.ts">
</script>
