import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import User from '../../types/user';
import api from '@/helpers/Api';
import SocialMedia from '../SocialMedia/SocialMedia';

@Component({
    components: {SocialMedia}
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
    private available: boolean = false;
    private private_data: boolean = false;
    private links: any[] = [
        {prefix: "https://facebook.com/", suffix: "", state: false},
        {prefix: "https://twitter.com/", suffix: "", state: false},
        {prefix: "https://linkedin.com/", suffix: "", state: false},
        {prefix: "https://github.com/", suffix: "", state: false},
    ]

    // LIFECYCLE HOOKS
    private async mounted(){
        this.resetFields(null);
        const url: string = api(`users/${this.user_prop.id}`);
        const response = await axios.get(url);
        try{
            if (!response.data.user.social_media){return;}
            const social_media_from_db: any[] = JSON.parse(response.data.user.social_media);
            let social_media = [];
            for (let i = 0; i < social_media_from_db.length; i++){
                social_media.push({
                    prefix: social_media_from_db[i].prefix,
                    suffix: social_media_from_db[i].suffix,
                    state: (social_media_from_db[i].suffix !== "")
                })
            }
            this.links = social_media;
        } catch (err){
            console.log(err);
        }
    }

    // METHODS
    /**
     * Setter for private member links.
     * @param links new links (array of objects)
     */
    private setLinks(links: any[]): void {
        this.links = links;
    }

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
                let modal: any = this.$refs.modal;
                modal.hide();
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
            social_media: this.links,
            available: this.available,
            private: this.user_prop.private
        }
        try {
            const url = api(`users/${this.user_prop.id}`);
            await axios.put(url, {user: user}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}
