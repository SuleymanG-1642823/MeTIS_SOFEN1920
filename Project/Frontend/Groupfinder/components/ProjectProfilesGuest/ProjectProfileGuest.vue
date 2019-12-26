<template>
    <div id="profilewrapper" v-if="profile !== undefined">
        <span>{{ profile.name }}</span>
        <b-form-checkbox class="apply-checkbox"></b-form-checkbox>
        <div id="skills">
            <b-badge
                v-for="skill in profile.skills"
                :key="skill.name"
                variant="info"
                class="skill badge"
            >
                {{ skill.name }}
            </b-badge>
        </div>
        <hr>
    </div>
</template>

<script lang="ts" src="./ProjectProfileGuest.ts">
</script>

<style scoped>

#profilewrapper{
    border: 1px solid black;
    margin: 10px 0 0 0;
    padding: 8px;
}

.apply-checkbox{
    float: right;
}

.skill.badge{
    margin: 0 4px 0 4px;
    font-size: 0.9rem;
    font-weight: lighter;
}

div#skills{
    margin-top: 10px;
}

hr{
    border-top-color: black;
    margin-left: -8px;
    margin-right: -8px;
    width: inherit;
}

</style>
