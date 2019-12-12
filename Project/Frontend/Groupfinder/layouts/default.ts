import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';

import Sidebar from '~/components/Sidebar/Sidebar'
import LoginForm from '~/components/LoginForm/LoginForm'

import { SidebarMenu } from 'vue-sidebar-menu'

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
            title: 'Main Navigation',
            hiddenOnCollapse: true
        },
        {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user'
        },
        {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
                {
                    href: '/charts/sublink',
                    title: 'Sub Link'
                }
            ]
        }
    ]

    // Data
    content_type: String;
    logged_in: Boolean = false;
    // Methods
    created(){
        this.content_type = "helloworld";
    }

    async mounted() {
    }
}