<template>
<div>
    <b-button variant="outline-primary"><nuxt-link id="new_project_button" to="/projectCreationForm" >New Project</nuxt-link></b-button>
    <h5>Projects:</h5>
    <ul>
        <!-- TODO: Query user's projects -->
    </ul>
</div>
</template>

<script lang="ts" src="./SidebarProjects.ts">
</script>

<style scoped>
#newProjectsBtn{
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>
