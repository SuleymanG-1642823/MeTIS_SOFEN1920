<template>
    <div>
        <loadingSpinner />
        <b-form @submit="updateProject">
            <ProjectEdit v-if="gotResponse" :project="project" @update_project="update_project"/>
            <b-modal v-model="modalShow" title="Form not correctly filled in!">
                <p v-if="categoriesNotValidated == 'true'">Select one or more categories</p>
            </b-modal>
            <b-button v-if="gotResponse" type="submit" variant="success">Save</b-button>
        </b-form>
    </div>
</template>

<script lang="ts" src="./editProject.ts">
</script>
