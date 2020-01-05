<template>
    <div>
        <loadingSpinner />
        <b-form @submit="updateProject">
            <ProjectEdit v-if="gotResponse" :project="project" @update_project="update_project"/>
            <b-modal v-model="modalShow" title="Form not correctly filled in!">
                <p v-if="categoriesNotValidated == 'true'">Select one or more categories</p>
            </b-modal>
            <b-container fluid>
                <b-row align-h="center" align-content="center">
                    <b-button class="submit-btn" v-if="gotResponse" type="submit" variant="success">Save</b-button>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script lang="ts" src="./editProject.ts">
</script>

<style scoped>

.submit-btn{
    width: 15%;
}

</style>
