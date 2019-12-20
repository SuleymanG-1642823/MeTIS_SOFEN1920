<template>
<div>
    <h5>Projects:</h5>
    <b-list-group>
        <b-list-group-item class="sidebar-projects" v-for="(project, index) in user_projects" v-bind:key="index">
            {{ project.name }}
        </b-list-group-item>
    </b-list-group>
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

.sidebar-projects{
    border-left: 0;
    border-right: 0;
}

</style>
