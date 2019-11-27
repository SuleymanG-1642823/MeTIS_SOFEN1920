import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';
import { format } from 'path';

@ Component
export default class LoginForm extends Vue {
    // Data
    mail : string = ''
    pass : string = ''
    
    // Methods
    tryLogin(){
        console.log('logging in')
        console.log('mail: ', this.mail)
        console.log('pass: ', this.pass)
    }
    
    login(evt: any){
        evt.preventDefault();
        console.log('login');
        this.$emit('setLoggedIn', true);
        this.$router.push('/recommendedProjects');
    }
}
