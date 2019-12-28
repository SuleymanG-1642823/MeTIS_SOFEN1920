<template>
<div>
    <h5>Projects:</h5>
    <b-list-group>
        <b-list-group-item v-for="(project, index) in user_projects" v-bind:key="index" class="sidebar-projects">
            <router-link :to="'/project/' + project.id">
                {{ project.name }}
            </router-link>
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

a{
    color: black;
    text-decoration: none;
}

</style>
