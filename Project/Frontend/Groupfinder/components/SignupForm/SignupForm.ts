import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';

@ Component
export default class SignupForm extends Vue {
    // Data
    first_name: string = ''
    last_name: string = ''
    email: string = ''
    emailConfirmation: string = ''
    password: string = ''
    passwordFieldType = 'password'
    passwordIcon = 'fa-eye-slash'
    passwordToggle = 'Show'
    
    // Methods
    onSignup(){
        console.log('signing up')
        // check equality of mail

    }

    toggleVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'  
      this.passwordIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-slash-eye'
      this.passwordToggle = this.passwordFieldType === 'password' ? 'Show' : 'Hide'
    }
    
}