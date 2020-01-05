<template>
<div id="sidebarprojects">
    <h5>Created projects:</h5>
    <!-- All the projects owned by the user -->
    <b-list-group>
        <b-list-group-item v-for="(project, index) in user_projects" v-bind:key="index" class="sidebar-projects">
            <router-link :to="'/project/' + project.id">
                {{ project.name }}
            </router-link>
        </b-list-group-item>
    </b-list-group>
    <h5>Joined Projects:</h5>
    <!-- All the projects where the user is a member of -->
    <b-list-group>
        <b-list-group-item v-for="(member_project, index) in member_projects" v-bind:key="index" class="sidebar-projects">
            <router-link :to="'/project/' + member_project.id">
                {{ member_project.name }}
            </router-link>
        </b-list-group-item>
    </b-list-group>
    <h5>Applications:</h5>
    <!-- All the projects where the user has applied for -->
    <b-list-group>
        <b-list-group-item v-for="(applied_project, index) in applied_projects" v-bind:key="index" class="sidebar-projects">
            <router-link :to="'/project/' + applied_project.id">
                {{ applied_project.name }}
            </router-link>
        </b-list-group-item>
    </b-list-group>
</div>
</template>

<script lang="ts" src="./SidebarProjects.ts">
</script>

<style scoped>
#sidebarprojects{
    color: white;
}
#newProjectsBtn{
    position: absolute;
    right: 0;
    bottom: 0;
}

.sidebar-projects{
    border-left: 0;
    border-right: 0;
    background-color:inherit;
}

a{
    color: white;
    text-decoration: none;
}

.sidebar-projects:hover{
    background-color: #f0f0f0;
}

.sidebar-projects:hover a {
    color: black;
    text-decoration: none;
}

</style>
