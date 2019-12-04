<template>
    <div>
        <loadingSpinner />
        <b-form @submit="updateProject">
            <ProjectEdit v-if="gotResponse" :project="project"/>
            <b-button v-if="gotResponse" type="submit" variant="success">Save</b-button>
        </b-form>
    </div>
</template>

<script lang="ts" src="./editProject.ts">
</script>
