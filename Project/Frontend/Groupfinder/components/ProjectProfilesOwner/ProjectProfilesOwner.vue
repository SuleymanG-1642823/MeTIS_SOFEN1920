<template>
    <div id="wrapper">
        <div id="head">
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

#wrapper{
    border: 1px solid blue;
    margin-top: 20px;
    min-height: 20px;
}

</style>
