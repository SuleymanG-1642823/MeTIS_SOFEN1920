<template>
<b-container fluid class="main">
    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"
        >
    <sidebar-menu
    :menu="sidebarmenu"
    :theme="theme"
    :showOneChild="showOneChild"
    :width="width"
    @toggle-collapse="onToggleCollapse"
    @item-click="sidbarItemClick"
    >
        <!--<b-img v-if="!collapsed" slot="header" class="py-3 px-3" src="./Groupfinder_logo.png" fluid />-->
    </sidebar-menu>
    <div id="content" :style="{ 'margin-left': contentMarginCSS }">
        <!-- Content components go here -->
        <nuxt />
    </div>
</b-container>
</template>

<script lang="ts" src="./default.ts">
</script>

<style>
#vertical-nav{
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding-top: 20px;
}

.btn-primary{
    background-color: darkblue;
}

body{
    color:#414141;
    background-color:#fcfcfc;
}

#content{
    margin: 30px;
    margin-left: 390px;
    transition: margin 1s;
}

.main{
    margin-left: 0px;
}

.main-row{
    width: 100%;
}

.content-col {
    padding-left: 0%;
}

.v-sidebar-menu {
    float: none;
    border-right: 2px solid;
    border-color: #e6e6e6;
}

/* TODO: background color not working on toggle button */
.vsm_white-theme.vsm--toggle-btn{
    background-color: black !important;
}
</style>
