<template>
<!--<div class="pl-3 pt-3">-->
<div class="pt-3">
    <!--
    <div class="btn-group flex-wrap" role="group">
        <button type="button" class="btn btn-secondary" v-on:click="notificationBtnClickEvent()" :disabled="notificationsBtnClicked">
        Notifications</button>
        <button type="button" class="btn btn-secondary" v-on:click="messagesBtnClickEvent()" :disabled="messagesBtnClicked">
        Messages</button>
        <button type="button" class="btn btn-secondary" v-on:click="projectsBtnClickEvent()" :disabled="projectsBtnClicked">
            <i class="far fa-lightbulb fa-3x sidebar-button-group"></i>
            <span>Projects</span>
        </button>
    </div>
    -->
    <b-tabs id="subnav">
        <b-tab @click="projectsBtnClickEvent()">
            <template v-slot:title>
                <div class="sidebar-tab">
                <i class="far fa-lightbulb fa-2x sidebar-button-group"></i>
                </div>
                <span>Projects</span>
            </template>
        </b-tab>
        <b-tab @click="notificationBtnClickEvent()">
            <template v-slot:title>
                <div class="sidebar-tab">
                    <NewNotificationsBadge v-if="viewNotificationBadge"/>
                    <i class="far fa-bell fa-2x sidebar-button-group"></i>
                </div>
                <span>Notifications</span>
            </template>
        </b-tab>
        <b-tab @click="messagesBtnClickEvent()">
            <template v-slot:title>
                <div class="sidebar-tab">
                <i class="far fa-comment fa-2x sidebar-button-group"></i>
                </div>
                <span>Messages</span>
            </template>
        </b-tab>
    </b-tabs>
    <div class="pl-3 pt-3">
        <!-- Sidebar components for projects, notifications and messages go here -->
        <SidebarProjects v-if="projectsBtnClicked" />
        <SidebarNotifications v-if="notificationsBtnClicked"/>
    </div>
</div>
</template>

<script lang="ts" src="./Sidebar.ts">

</script>

<style scoped>
.sidebar-button-group{
    display: block;
}

.sidebar-tab{
    text-align:center;
    color: black;
}

#subnav *{
    color: black;
}

.sidebar-tab > i {
    display: inline-block;

}

</style>
