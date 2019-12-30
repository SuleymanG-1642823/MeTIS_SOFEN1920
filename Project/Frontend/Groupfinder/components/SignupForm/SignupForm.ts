import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import { ValidationObserver, ValidationProvider } from "vee-validate";

@ Component({
  components: {ValidationObserver, ValidationProvider}
})
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
    
    commit(){
      console.log('commiting')
      this.$store.commit('auth/SET_USER', 
      {
        id: 1,
        first_name: 'Lennert',
        last_name: 'Geebelen',
        mail: 'lennert.geebelen@mail.com',
        address: 'ditiseenstraatnaam 100',
        zip: '3500',
        city: 'Brussel',
        tel: '+32000112233',
        website: 'www.mywebsite.be',
        social_media: {}
      })
      console.log('committed')
    }
    
    toggleVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'  
      this.passwordIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-slash-eye'
      this.passwordToggle = this.passwordFieldType === 'password' ? 'Show' : 'Hide'
    }
    
}