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

    theme: String = 'dark-theme';
    showOneChild: Boolean= true;
    width: String = '350px';

    sidebarmenu: any[] = [
        {
            header: true,
            title: 'Profile',
            hidden: !this.$store.state.auth.loggedIn,
            hiddenOnCollapse: true
        },
        {
            title: this.getFullName(),
            icon: 'fas fa-user',
            hidden: !this.$store.state.auth.loggedIn
        },
        {
            header: true,
            title: 'Groupfinder',
            hiddenOnCollapse: true
        },
        {
            title: 'Home',
            icon: 'fas fa-home',
            hidden: !this.$store.state.auth.loggedIn
        },
        {
            title: 'Create Project',
            icon: 'fas fa-plus-square',
            hidden: !this.$store.state.auth.loggedIn
        },
        {
            title: 'Sign out',
            icon: 'fas fa-sign-out-alt',
            hidden: !this.$store.state.auth.loggedIn
        },
        {
            component: LoginForm,
            // props: componentProps
            hidden: this.$store.state.auth.loggedIn,
            hiddenOnCollapse: true
        },
        {
            component: Sidebar,
            hidden: !this.$store.state.auth.loggedIn,
            hiddenOnCollapse: true
        }
    ];

    // Data
    content_type: String;
    
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
        else if (item.title == 'Sign out'){
            this.$store.commit('localStorage/RESET_TOKEN');
            this.$store.commit('localStorage/RESET_PW');
            this.$store.commit('localStorage/RESET_MAIL');
            this.$store.commit('localStorage/RESET_ID');
            this.$store.commit('auth/RESET_USER');
            this.$store.commit('auth/SET_LOGIN', false);
            this.$router.push('/signup');
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
