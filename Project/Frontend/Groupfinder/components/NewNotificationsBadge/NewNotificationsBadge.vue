<template>
    <div>
        {{ numbOfNewNotif }}
    </div>
</template>

<script lang="ts" src="./NewNotificationsBadge.ts">
</script>

<style scoped>

div{
    font-size: 0.8rem;
    font-weight: 700;
    max-width: 35px;
    border-radius: 10px;
    padding: 0 4px 0 4px;
    background-color: #DC3545;
    color: white;
    float: right;
    display: block;
    margin-left: -100px; /* leave this at a high value, allows the bell icon to stay where it originally stays without the badge */
    margin-right: 5px;
}

</style>
