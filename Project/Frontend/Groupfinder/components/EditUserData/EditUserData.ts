import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import User from '../../types/user';
import api from '@/helpers/Api';

@Component({
    components: {}
})
export default class EditUserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    private first_name: string = '';
    private last_name: string = '';
    private mail: string = '';
    private tel: string = '';
    private address: string = '';
    private zip: string = '';
    private city: string = '';
    private website: string = '';
    private social_media: Object = {};
    private available: boolean = false;
    private private_data: boolean = false;


    // LIFECYCLE HOOKS
    private mounted(){
        this.resetFields(null);
    }

    // METHODS
    /**
     * Validate the new data of the user.
     */
    private validateData(): boolean {
        // TODO
        return true;
    }

    /**
     * Validate the new data and save changes to the server is the new data is valid.
     * @param event the event emitted when this method was called.
     */
    private async handleSubmit(event: any) {
        event.preventDefault();
        if (this.validateData()){
            await this.saveChanges();
            this.$nextTick(() => {
                this.$refs.modal.hide();
            })
        }
        return;
    }

    /**
     * Remove all updates to the fields. Reset all data to the initial data of the user.
     * @param event the event emitted when this method was called.
     */
    private resetFields(event: any): void {
        this.first_name = this.user_prop.first_name;
        this.last_name = this.user_prop.last_name;
        this.mail = this.user_prop.mail;
        this.tel = this.user_prop.tel;
        this.address = this.user_prop.address;
        this.zip = this.user_prop.zip;
        this.city = this.user_prop.city;
        this.website = this.user_prop.website;
        this.social_media = this.user_prop.social_media;
        this.available = this.user_prop.available;
    }

    /**
     * Save the new data on the server.
     */
    private async saveChanges() {
        let user: User = {
            id: this.user_prop.id,
            first_name: this.first_name,
            last_name: this.last_name,
            mail: this.mail,
            tel: this.tel,
            address: this.address,
            zip: this.zip,
            city: this.city,
            website: this.website,
            social_media: '{}',
            available: this.available,
            private: this.user_prop.private
        }
        try {
            const url = api(`users/${this.user_prop.id}`);
            //let url = `http://localhost:4000/users/${this.user_prop.id}`;
            await axios.put(url, {user: user}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}