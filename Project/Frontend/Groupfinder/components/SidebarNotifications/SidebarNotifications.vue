<template>
    <div id="wrapper">
        <Notification :isNew="true" msg="This is a test notif This is a test notif This is a test notif This is a test notif This is a test notif This is a test notif This is a test notif "/>
        <hr>
        <Notification msg="This is the second notification." />
    </div>
</template>

<script lang="ts" src="./SidebarNotifications.ts">

</script>

<style scoped>

hr{
    margin-right: 16px;
}

</style>
