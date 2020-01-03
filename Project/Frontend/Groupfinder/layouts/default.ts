import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';

import Sidebar from '~/components/Sidebar/Sidebar'
import LoginForm from '~/components/LoginForm/LoginForm'

import User from '~/types/user';
@ Component({
    components: {Sidebar, LoginForm}
})
export default class MainLayout extends Vue {
    // Components
    components: { 
        'Sidebar': Sidebar
        'LoginForm': LoginForm
    }

    // Indicates if the sidebar is collapsed or not
    collapsed: Boolean = false;
    // Starting margin of the content when the sidebar is not collapsed
    contentMarginCSS: String = "390px";
    // Margin of the content when the sidebar is collapsed
    contentMarginCSS_Collapsed: String = "60px";
    // Margin of the content when the sidebar is not collapsed
    contentMarginCSS_NotCollapsed: String = "390px";

    sidebarmenu: any[] = [
        {
            header: true,
            title: 'Profile',
            hiddenOnCollapse: true
        },
        {
            title: this.getFullName(),
            icon: 'fas fa-user',
            hidden: false
        },
        {
            header: true,
            title: 'Groupfinder',
            hiddenOnCollapse: true
        },
        {
            title: 'Home',
            icon: 'fas fa-home',
            hidden: false
        },
        {
            title: 'Create Project',
            icon: 'fas fa-plus-square',
            hidden: false
        },
        {
            component: LoginForm,
            // props: componentProps
            hidden: true,
            hiddenOnCollapse: true
        },
        {
            component: Sidebar,
            hidden: false,
            hiddenOnCollapse: true
        }
    ];

    theme: String = 'dark-theme';
    showOneChild: Boolean= true;
    width: String = '350px';

    // Data
    content_type: String;
    // TODO LOGGED IN -> change sidebarmenu hidden
    logged_in: Boolean = false;
    // Methods
    created(){
        this.content_type = "helloworld";
    }

    async mounted() {
        
    }

    sidbarItemClick(event: any, item: any){
        if (item.title == "Home"){
            this.$router.push('/recommendedProjects');
        }
        else if (item.title == "Create Project"){
            this.$router.push('/projectCreationForm');
        }
        else if (item.title == this.getFullName()){
            this.$router.push('/myprofile');
        }
    }

    // This method is triggered when the collapse button is pressed
    onToggleCollapse(){
        // Change the boolean value of collapsed
        // and change the padding of the content
        if (this.collapsed){
            this.collapsed = false;
            this.contentMarginCSS = this.contentMarginCSS_NotCollapsed;
        }
        else {
            this.collapsed = true;
            this.contentMarginCSS = this.contentMarginCSS_Collapsed;
        }
    }

    private getFullName(){
        return `${this.$store.state.auth.user.first_name} ${this.$store.state.auth.user.last_name}`;
    }
}
