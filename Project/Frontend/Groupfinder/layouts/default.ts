import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';

import Sidebar from '~/components/Sidebar/Sidebar'
import LoginForm from '~/components/LoginForm/LoginForm'

@ Component({
    components: {Sidebar, LoginForm}
})
export default class MainLayout extends Vue {
    // Components
    components: { 
        'Sidebar': Sidebar
        'LoginForm': LoginForm
    }

    // Data
    content_type: String;
    logged_in: Boolean = false;
    // Methods
    created(){
        this.content_type = "helloworld";
    }

    async mounted() {
    }

    setLoggedIn(value: boolean){
        console.log("Caught emit");
        this.logged_in = value;
    }
}