<template>
    <div id="wrapper">
        <div v-if="isNew" id="newNotif"></div>
        <router-link
            v-if="destination.length > 0"
            :to="destination">
           <p class="msg">{{displayedMsg}}</p>
        </router-link>
        <p v-if="destination.length === 0" class="msg">{{displayedMsg}}</p>
        <span id="created">{{createdAt}}</span>
        <button v-if="expandable" id="expand" @click="expandCollapseBtnClickEvent()">{{expandBtnText}}</button>
    </div>
</template>

<script lang="ts" src="./Notification.ts">

</script>

<style scoped>

#wrapper{
    /*border: 1px solid black;*/
    margin: 0 8px 10px 0;
    padding: 5px 5px 14px 5px;
    overflow: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: black;
}

#wrapper:hover{
    background-color: #f0f0f0;
}

.msg{
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

a{
    text-decoration: none;
    color: black;
}

</style>
