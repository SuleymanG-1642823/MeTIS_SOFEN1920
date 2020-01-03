<template>
    <div id="wrapper">
        <h1 v-if="notFound">404: Project could not be found</h1>
        <div id="projectWrapper" v-if="!notFound">
            <ProjectInformation
                :title="project.name"
                :description="project.pitch"
                :createdAt="project.created_at"
                :categories="project.categories"
                :creator="project.creator_first_name + ' ' + project.creator_last_name"
                :creatorID="project.creator_id"
            />
            <router-link :to="'/editProject/'+project.id">
                <b-button
                    v-if="isOwner"
                    variant="primary"
                    class="edit icon_button"
                >
                    <i class="fas fa-pen"></i>
                </b-button>
            </router-link>
            <ProjectProfilesGuest v-if="!isOwner" :profiles="project.profiles"/>
            <ProjectProfilesOwner v-if="isOwner" :profiles="project.profiles"/>
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

.icon_button{
      width: 50px;
      height: 50px;
      border-radius: 35px;
      font-size: 20px;
}
.edit{
    position: fixed;
    right: 30px;
    top: 30px;
}

/*button.edit{
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
}*/
</style>
