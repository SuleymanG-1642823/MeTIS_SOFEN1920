<template>
    <div id="wrapper">
        <h1 v-if="notFound">Project could not be found</h1>
        <div id="projectWrapper">
            <ProjectInformation
                v-if="project !== null"
                :title="project.name"
                :description="project.pitch"
                :createdAt="project.created_at"
                :categories="project.categories"
                :creator="project.creator_first_name + ' ' + project.creator_last_name"
            />
        </div>
    </div>
</template>

<script lang="ts" src="./project.ts">
</script>

<style scoped>

#projectWrapper{
    max-width: 1140px;
    margin: 0 auto;
    display: block;
}
</style>
