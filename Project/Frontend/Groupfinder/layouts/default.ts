import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';

import Sidebar from '~/components/Sidebar/Sidebar'
import LoginForm from '~/components/LoginForm/LoginForm'

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

@ Component({
    components: {Sidebar, LoginForm, SidebarMenu}
})
export default class MainLayout extends Vue {
    // Components
    components: { 
        'Sidebar': Sidebar
        'LoginForm': LoginForm
    }

    sidebarmenu: any[] = [
        {
            header: true,
            title: 'Profile',
            hiddenOnCollapse: true
        },
        {
            title: 'Profile Name',
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
            hidden: false,
            child: [
                {
                    href: '/charts/sublink',
                    title: 'Sub Link'
                }
            ]
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

    theme: String = 'white-theme';
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
            this.$router.push('/');
        }
        else if (item.title == "Create Project"){
            this.$router.push('/projectCreationForm');
        }
    }
}