<template>
    <div id="wrapper">
        <div id="head">
            <span class="informative">We are looking for these profiles</span>
            <b-button id="btnApply" variant="outline-dark">Apply</b-button>
        </div>
        <ProjectProfileGuest
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
        />
    </div>
</template>

<script lang="ts" src="./ProjectProfilesGuest.ts">
</script>

<style scoped>

#wrapper{
    border: 1px solid red;
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
