import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from "vee-validate";
import User from '../../types/user'


@ Component({
  components: {ValidationObserver, ValidationProvider}
})
export default class SignupForm extends Vue {
    // Data
    first_name: string = ''
    last_name: string = ''
    mail: string = ''
    mailConfirmation: string = ''
    password: string = ''
    passwordFieldType = 'password'
    passwordIcon = 'fa-eye-slash'
    passwordToggle = 'Show'
    errors: string[] = [];
    
    // Methods
    async onSignup(){
        try{
          const response = await this.$axios.post(this.$api('auth/register'), {fname: this.first_name, lname: this.last_name, mail: this.mail, mailConfirmation: this.mailConfirmation, password: this.password});
          if(response.status == 201){
            const user: User = response.data.user;            
            this.$store.commit('auth/SET_USER', user);
            this.$store.commit('auth/SET_LOGIN', true);
            this.$store.commit('localStorage/SET_EMAIL', this.mail);
            this.$store.commit('localStorage/SET_PW', this.password);
            this.$store.commit('localStorage/SET_ID', user.id)
            this.$router.push('/recommendedProjects');
          }
        }
        catch(error){
          if(error.response){
            if(error.response.status == 422){
              this.errors = error.response.data.messages;
            }
            else{
              this.errors = ["Internal server error"]
              console.log("Error status on response: ", error.response.status);
            }
          }
        }
    }
    
    toggleVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'  
      this.passwordIcon = this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-slash-eye'
      this.passwordToggle = this.passwordFieldType === 'password' ? 'Show' : 'Hide'
    }

    removeError(index: number){
      this.errors.splice(index, 1);
    }
    
}