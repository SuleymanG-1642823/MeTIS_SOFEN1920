import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import api from '@/helpers/Api';

@ Component
export default class ChangePassword extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userID_prop: number;
    
    // DATA
    private old_password: string = '';
    private new_password: string = '';
    private repeated_new_password: string = '';
    private showSuccessMessage: boolean = false;
    private showFailMessage: boolean = false;
    private invalidMessage: string = '';

    // METHODS
    /**
     * Validate password.
     * The password will be checked for the following requirements:
     * 1) The password must contain at least 8 characters,
     * 2) The password must contain at least 1 capital letter,
     * 3) The password must contain at least 1 lowercase letter,
     * 4) The password must contain at least 1 number digit,
     * 5) new_password must be equal to repeated_new_password.
     * @param new_password 
     * @param repeated_new_password 
     */
    private validateData(new_password: string, repeated_new_password: string): boolean {
        if (new_password.length < 8){
            this.invalidMessage = "Your password must contain at least 8 characters.";
        }
        else if (! (/.*[A-Z]+.*/.test(new_password))){
            this.invalidMessage = "Your password must contain at least 1 capital letter.";
        }
        else if (! (/.*[a-z]+.*/.test(new_password))){
            this.invalidMessage = "Your password must contain at least 1 lowercase letter.";
        }
        else if (! (/.*[0-9]+.*/.test(new_password))){
            this.invalidMessage = "Your password must contain at least 1 number digit.";
        }
        else if (new_password != null){
            if (new_password.localeCompare(repeated_new_password) != 0){
                this.invalidMessage = "Your new passwords do not match.";
            }
        }
        else{
            return true;
        }
        return false;
    }

    /**
     * This method will check if the old password is correct and if the new password meets the requirements.
     * If the passwords meets the requirements, then the new password will be saved on the server.
     * @param event the event emitted when this method was called.
     */
    private async handleSubmit(event: any) {
        event.preventDefault();
        const correctPassword: boolean = await this.correctPassword(this.old_password);
        if (this.validateData(this.new_password, this.repeated_new_password) && correctPassword){
            try{
                await this.sendToBackend(this.new_password);
                this.invalidMessage = '';
                this.old_password = '';
                this.new_password = '';
                this.repeated_new_password = '';
                this.showSuccessMessage = true;
            } catch (err){
                console.log(`An error occured while changing password: ${err}`);
                this.showFailMessage = true;
            }
        }
    }

    /**
     * Save the new password on the server.
     * @param password the new password in plain text.
     */
    private async sendToBackend(password: string){
        try {
            const url = api(`users/password/${this.userID_prop}`);
            await this.$axios.put(url, {password: password}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while changing user's password in the database:\n${err}`);
        }
    }

    /**
     * Check for a correct old user's password.
     * @param password the old password of a user.
     */
    private async correctPassword(password: string): Promise<boolean> {
        return new Promise(
            async (resolve, reject) => {
                const url = api(`users/correctPassword/${this.userID_prop}`);
                try{
                    const response = await this.$axios.post(url, {password: password}, {headers: {'Content-Type': 'application/json'}});
                    if (!response.data.valid){this.invalidMessage = 'Your old password is incorrect.';}
                    resolve(response.data.valid);
                } catch (err) {
                    reject(err);
                }
            }
        );
    }
}
