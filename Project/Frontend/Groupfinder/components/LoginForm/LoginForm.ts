import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import User from '../../types/user'

@ Component
export default class LoginForm extends Vue {
    // Data
    mail : string = ''
    pass : string = ''
    passwordFieldType = 'password'
    passwordIcon = 'fa-eye-slash'
    passwordToggle = 'Show'
    errors: string[] = [];

    // Methods
    async tryLogin(){
        try{
          const response = await this.$axios.post(this.$api('auth/login'), {mail: this.mail, password: this.pass});
          if(response.status == 200){
            const user: User = response.data.user
            this.$store.commit('auth/SET_USER', user);
            this.$store.commit('auth/SET_LOGIN', true);
            this.$store.commit('localStorage/SET_MAIL', this.mail);
            this.$store.commit('localStorage/SET_PW', this.pass);
            this.$store.commit('localStorage/SET_ID', user.id);
            window.location.reload(true);
            this.$router.push('/recommendedProjects');
          }
          else if(response.status == 422){
            this.errors = response.data.messages;
          }
          else{
            this.errors = ["Internal server error"]
            console.log("Error status on response: ", response.status);
          }
        }
        catch(error){
          console.log("Error when posting new user: ", error);
        }
    }

    toggleVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'  
        this.passwordIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-slash-eye'
        this.passwordToggle = this.passwordFieldType === 'password' ? 'Show' : 'Hide'
      }
}
