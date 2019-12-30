<template>
    <div id="wrapper">
        <strong v-if="profiles===undefined">
            This project has no profiles yet.
        </strong>
        <div id="head" v-if="profiles!==undefined">
            <span class="informative">Profiles: </span>
        </div>
        <ProjectProfileOwner
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
        />
    </div>
</template>

<script lang="ts" src="./ProjectProfilesOwner.ts">
</script>

<style scoped>

strong{
    font-size: 1.4rem;
}

</style>
