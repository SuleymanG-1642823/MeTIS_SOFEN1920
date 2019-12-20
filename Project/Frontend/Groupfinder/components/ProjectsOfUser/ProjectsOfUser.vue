<template>
    <div>
        <h2>Created</h2>
        <p v-if="this.projects_owner.length < 1">This user hasn't created any projects yet.</p>
        <BasicProjectCard v-for="project in this.projects_owner" v-bind:key="project.id" :userID_prop=userID :project_prop="project"/>
        <h2>Joined</h2>
        <p v-if="this.projects_member.length < 1">This user hasn't joined any projects yet.</p>
        <BasicProjectCard v-for="project in this.projects_member" v-bind:key="project.id" :userID_prop=userID :project_prop="project"/>
    </div>
</template>

<script lang="ts" src="./ProjectsOfUser.ts">
</script>
