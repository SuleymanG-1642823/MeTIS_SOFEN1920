<template>
    <div id="root-div">
        <strong v-if="project === null">
            The requested project could not be found.
        </strong>
        <div id="wrapper" v-if="project !== null">
            <h1>Invite users</h1>
            <h1>Recommended users</h1>
            <RecommendedUsers :projectID="project.id" />
        </div>
    </div>
</template>

<script lang="ts" src="./findUsers.ts">

</script>

<style scoped>

div#wrapper{
    width: 100%;
    height: 100%;
}

strong{
    font-size: 1.4rem;
    color: red;
    display: block;
    width: 100%;
    text-align: center;
}

h1{
    font-size: 1.6rem;
}

</style>
