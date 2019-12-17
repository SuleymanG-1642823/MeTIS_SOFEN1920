<template>
    <ul>
        <li v-for="skill in this.skills" v-bind:key="skill.name">{{ skill.name }}</li>
    </ul>
</template>

<script lang="ts" src="./SkillsOfUser.ts">
</script>
