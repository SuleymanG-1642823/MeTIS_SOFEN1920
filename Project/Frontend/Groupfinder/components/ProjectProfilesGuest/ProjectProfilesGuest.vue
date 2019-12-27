<template>
    <div id="wrapper">
        <div id="head">
            <span class="informative">We are looking for these profiles</span>
            <b-button id="btnApply" variant="outline-dark" @click="redirectToApplicationPage">Apply</b-button>
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

</style>
