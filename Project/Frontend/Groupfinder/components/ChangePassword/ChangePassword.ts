import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
let bcrypt = require('bcryptjs');

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
    private validateData(): boolean {
        if (this.new_password.length < 8){
            this.invalidMessage = "Your password must contain at least 8 characters.";
        }
        else if (! (/.*[A-Z]+.*/.test(this.new_password))){
            this.invalidMessage = "Your password must contain at least 1 capital letter.";
        }
        else if (! (/.*[a-z]+.*/.test(this.new_password))){
            this.invalidMessage = "Your password must contain at least 1 lowercase letter.";
        }
        else if (! (/.*[0-9]+.*/.test(this.new_password))){
            this.invalidMessage = "Your password must contain at least 1 number digit.";
        }
        else if (this.new_password.localeCompare(this.repeated_new_password) != 0){
            this.invalidMessage = "Your new passwords do not match.";
        }
        else{
            return true;
        }
        return false;
    }

    private async handleSubmit(event: any) {
        event.preventDefault();
        const hashedPsw: string = await this.hashPassword(this.old_password);
        const correctPassword: boolean = await this.correctPassword(hashedPsw);
        if (this.validateData() && correctPassword){
            try{
                await this.sendToBackend(hashedPsw);
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

    private async sendToBackend(password: string){
        try {
            let url = `http://localhost:4000/users/password/${this.userID_prop}`;
            await axios.put(url, {password: password}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while changing user's password in the database:\n${err}`);
        }
    }

    private async correctPassword(hashedPsw: string): Promise<boolean> {
        return new Promise(
            async (resolve, reject) => {
                const url = `http://localhost:4000/users/correctPassword/${this.userID_prop}`
                try{
                    const response = await axios.post(url);
                    if (!response.data.valid){this.invalidMessage = 'Your old password is incorrect.';}
                    resolve(response.data.valid);
                } catch (err) {
                    reject(err);
                }
            }
        );
    }

    private hashPassword(password: string): Promise<string>{
        return new Promise(
            (resolve, reject) => {
                bcrypt.genSalt(10, function(err: any, salt: any) {
                    bcrypt.hash(password, salt, function(err: any, hash: any) {
                        if (err){
                            reject(err)
                        } else {
                            resolve(hash)
                        }
                    });
                });
            }
        );
    }
}
