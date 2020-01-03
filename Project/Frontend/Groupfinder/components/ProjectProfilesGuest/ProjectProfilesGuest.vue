<template>
    <div id="wrapper">
        <strong v-if="profiles===undefined || profiles.length === 0">
            This project has no profiles yet.
        </strong>
        <div id="head" v-if="profiles!==undefined && profiles.length > 0">
            <span class="informative">We are looking for these profiles:</span>
            <b-button id="btnApply" variant="primary" @click="redirectToApplicationPage">Apply</b-button>
        </div>
        <ProjectProfileGuest
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
            @profile-checked="onProfileChecked"
            @profile-unchecked="onProfileUnchecked"
        />
        <b-modal
            id="my-modal"
            v-model="showModal"
            centered
            ok-only
            title="Notice"
        >
            You need to select at least one profile to apply.
        </b-modal>
    </div>
</template>

<script lang="ts" src="./ProjectProfilesGuest.ts">
</script>

<style scoped>

#wrapper{
    min-height: 20px;
}

#btnApply{
    float: right;
}

div#head{
    overflow: auto;
    margin-bottom: 10px;
}

strong{
    font-size: 1.4rem;
}

</style>
