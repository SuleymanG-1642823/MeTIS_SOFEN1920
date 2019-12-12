<template>
<b-container class="mx-0 main">
    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <b-row class="main-row">
        <b-col class="px-0">
            <SidebarMenu :menu="sidebarmenu" :theme="theme" :showOneChild="showOneChild" @item-click="sidbarItemClick" :width="width">
                <b-img slot="header" class="py-3 px-3" src="./Groupfinder_logo.png" fluid :hiddenOnCollapse="true"/>
            </SidebarMenu>
        </b-col>
        <b-col cols="8">
            <div id="content">
                <!-- Content components go here -->
                <nuxt />
            </div>
        </b-col>
    </b-row>
</b-container>
</template>

<script lang="ts" src="./default.ts">
</script>

<style scoped>
#vertical-nav{
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding-top: 20px;
}

#content{
    padding-top: 60px;
    padding-left: 20px;
}

.main-row{
    width: 100%;
}

.content-col {
    padding-left: 0%;
}

.v-sidebar-menu {
    float: none;
    position: static;
    border-right: 2px solid;
    border-color: #e6e6e6;
}

/* TODO: background color not working on toggle button */
.vsm_white-theme.vsm--toggle-btn{
    background-color: black !important;
}
</style>
