import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';

import SidebarProjects from '~/components/SidebarProjects/SidebarProjects.vue'

@ Component({
    components: {
        SidebarProjects
    }
})
export default class Sidebar extends Vue {
    // Data
    name: "Sidebar";
    projectsBtnClicked: boolean = true;
    messagesBtnClicked: boolean = false;
    notificationsBtnClicked: boolean = false;

    // Methods
    created(){
    }

    projectsBtnClickEvent(){
        this.projectsBtnClicked = true;
        this.messagesBtnClicked = false;
        this.notificationsBtnClicked = false;
    }

    messagesBtnClickEvent(){
        this.projectsBtnClicked = false;
        this.messagesBtnClicked = true;
        this.notificationsBtnClicked = false;
    }

    notificationBtnClickEvent(){
        this.projectsBtnClicked = false;
        this.messagesBtnClicked = false;
        this.notificationsBtnClicked = true;
    }

    async mounted() {
    }
}
