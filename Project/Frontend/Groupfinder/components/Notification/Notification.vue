<template>
    <div id="wrapper">
        <div v-if="isNew" id="newNotif"></div>
        <p id="msg">{{displayedMsg}}</p>
        <span id="created">{{createdAt}}</span>
        <button v-if="expandable" id="expand" @click="expandCollapseBtnClickEvent()">{{expandBtnText}}</button>
    </div>
</template>

<script lang="ts" src="./Notification.ts">

</script>

<style scoped>

#wrapper{
    /*border: 1px solid black;*/
    margin-right: 8px;
    padding: 5px;
    overflow: auto;
}

#msg{
    margin-left: 8px;
    font-size:1rem;
    margin-bottom: 4px;
}

#created{
    font-size: 0.9rem;
    color: #606060;
    float: left;
}

#expand{
    background-color: transparent;
    border: none;
    font-size: 0.9rem;
    color: #606060;
    float: right;
}

#newNotif{
    color: #dc3545;
    background-color: #dc3545;
    border-radius: 5px;
    height: 10px;
    width: 10px;
}

hr{
    color: black;
}

</style>
