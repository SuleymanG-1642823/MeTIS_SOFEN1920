<template>
    <div>
        <h2>Created</h2>
        <BasicProjectCard v-for="project in this.projects_owner" v-bind:key="project.id" :userID_prop="3" :project_prop="project"/>
        <h2>Joined</h2>
    </div>
</template>

<script lang="ts" src="./ProjectsOfUser.ts">
</script>
