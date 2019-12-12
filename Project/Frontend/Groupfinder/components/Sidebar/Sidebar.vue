<template>
<div class="pl-3 pt-3">
    <div class="btn-group flex-wrap" role="group">
        <button type="button" class="btn btn-secondary" v-on:click="notificationBtnClickEvent()" :disabled="notificationsBtnClicked">
        Notifications</button>
        <button type="button" class="btn btn-secondary" v-on:click="messagesBtnClickEvent()" :disabled="messagesBtnClicked">
        Messages</button>
        <button type="button" class="btn btn-secondary" v-on:click="projectsBtnClickEvent()" :disabled="projectsBtnClicked">
        Projects</button>
    </div>
    <div class="pt-3">
        <!-- Sidebar components for projects, notifications and messages go here -->
        <SidebarProjects v-if="projectsBtnClicked" />
    </div>
</div>
</template>

<script lang="ts" src="./Sidebar.ts">

</script>

<style scoped></style>
