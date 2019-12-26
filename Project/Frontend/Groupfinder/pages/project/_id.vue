<template>
    <div id="wrapper">
        <h1 v-if="notFound">Project could not be found</h1>
        <div id="projectWrapper" v-if="!notFound">
            <ProjectInformation
                :title="project.name"
                :description="project.pitch"
                :createdAt="project.created_at"
                :categories="project.categories"
                :creator="project.creator_first_name + ' ' + project.creator_last_name"
                :creatorID="project.creator_id"
            />
            <button
                v-if="isOwner"
                class="edit"
            >
                <i class="fas fa-pen"></i>
            </button>
            <ProjectProfilesGuest :profiles="project.profiles"/>
            <ProjectProfilesOwner />
        </div>
    </div>
</template>

<script lang="ts" src="./project.ts">
</script>

<style scoped>

#wrapper{
    padding-right: 40px;
}

#projectWrapper{
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
}

button.edit{
    background: none;
    color: inherit;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    border: 2px solid black;
    height: 3.4rem;
    width: 3.4rem;
    border-radius: 1.7rem;
    position: fixed;
    right: 5px;
    top: 30px;
}

button.edit > i {
    font-size: 2rem;
}

ProjectInformation{
    display: inline-block;
}

</style>
