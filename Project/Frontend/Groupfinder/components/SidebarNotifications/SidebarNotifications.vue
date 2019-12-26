<template>
    <div id="wrapper">
        <Notification
            v-for="(notif, index) in notifications"
            :key="index"
            :isNew="notif.status === 0"
            :createdAt="notif.created_at"
            :msg="notif.msg"
            :destination="notif.dest_url"
        />
    </div>
</template>

<script lang="ts" src="./SidebarNotifications.ts">

</script>

<style scoped>

hr{
    margin-right: 16px;
}

</style>
