import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
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
    private valid_first_name: boolean|null = null;
    private last_name: string = '';
    private valid_last_name: boolean|null = null;
    private mail: string = '';
    private valid_mail: boolean|null = null;
    private tel: string = '';
    private valid_tel: boolean|null = null;
    private address: string = '';
    private valid_address: boolean|null = null;
    private zip: string = '';
    private valid_zip: boolean|null = null;
    private city: string = '';
    private valid_city: boolean|null = null;
    private website: string = '';
    private valid_website: boolean|null = null;
    private available: boolean = false;
    private private_data: boolean = false;
    private links: any[] = [
        {prefix: "https://facebook.com/", suffix: "", state: false},
        {prefix: "https://twitter.com/", suffix: "", state: false},
        {prefix: "https://linkedin.com/", suffix: "", state: false},
        {prefix: "https://github.com/", suffix: "", state: false},
    ]

    // WATCHERS
    @Watch('first_name')
    onFirstNameChange(newValue: string, oldValue: string){
        if (this.first_name.localeCompare(this.user_prop.first_name) == 0){
            this.valid_first_name = null;
        }
        else if (this.first_name.length < 2){
            this.valid_first_name = false
        } else {
            this.valid_first_name = true;
        }
    }

    @Watch('last_name')
    onLastNameChange(newValue: string, oldValue: string){
        if (this.last_name.localeCompare(this.user_prop.last_name) == 0){
            this.valid_last_name = null;
        }
        else if (this.last_name.length < 2){
            this.valid_last_name = false
        } else {
            this.valid_last_name = true;
        }
    }

    @Watch('mail')
    onEmailChange(newValue: string, oldValue: string){
        // Regex source: https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
        // This is the official regex used by W3C for email inputs
        if (this.mail.localeCompare(this.user_prop.mail) == 0){
            this.valid_mail = null;
        }
        else if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.mail)){
            this.valid_mail = true;
        }
        else {
            this.valid_mail = false;
        }
    }

    @Watch('tel')
    onTelChange(newValue: string, oldValue: string){
        if (this.tel.localeCompare(this.user_prop.tel) == 0){
            this.valid_tel = null;
        }
        else if (/^[+]*[0-9]{1,4}[-\s\./0-9]*$/.test(this.tel) || this.tel.localeCompare('') == 0){
            this.valid_tel = true;
        }
        else{
            this.valid_tel = false;
        }
    }

    @Watch('address')
    onAddressChange(newValue: string, oldValue: string){
        if (this.address.localeCompare(this.user_prop.address) == 0){
            this.valid_address = null;
        }
        else if ((/^[a-zA-Z 0-9\.\-\s]+$/.test(this.address) && this.address.length > 4) || this.address.length == 0){
            this.valid_address = true;
        }
        else{
            this.valid_address = false;
        }
    }

    @Watch('zip')
    onZipChange(newValue: string, oldValue: string){
        if (this.zip.localeCompare(this.user_prop.zip) == 0){
            this.valid_zip = null;
        }
        else if ((/^[a-zA-Z 0-9\.\-]+$/.test(this.zip) && this.zip.length > 1) || this.zip.length == 0){
            this.valid_zip = true;
        }
        else {
            this.valid_zip = false;
        }
    }

    @Watch('city')
    onCityChange(newValue: string, oldValue: string){
        if (this.city.localeCompare(this.user_prop.city) == 0){
            this.valid_city = null;
        }
        else if ((/^[a-zA-Z 0-9\.\-\s]+$/.test(this.city) && this.city.length > 1) || this.city.length == 0){
            this.valid_city = true;
        }
        else {
            this.valid_city = false;
        }
    }

    @Watch('website')
    onWebsiteChange(newValue: string, oldValue: string){
        if (this.website.localeCompare(this.user_prop.website) == 0){
            this.valid_website = null;
        }
        else if (/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(this.website) || this.website.localeCompare('') == 0){
            this.valid_website = true;
        } else {
            this.valid_website = false;
        }
    }

    // LIFECYCLE HOOKS
    private async mounted(){
        this.resetFields(null);
        if (this.user_prop.social_media){
            let links: any[] = [];
            for (let i = 0; i < this.user_prop.social_media.length; i++) {
                links.push({
                    prefix: this.user_prop.social_media[i].prefix,
                    suffix: this.user_prop.social_media[i].suffix,
                    state: (this.user_prop.social_media[i].suffix !== '')
                })
            }
            this.links = links;
        }
    }

    // Computed
    get submit_permitted(): boolean{
        return !(this.valid_first_name===false || this.valid_last_name===false || this.valid_mail===false || this.valid_tel===false || this.valid_address===false || this.valid_zip===false || this.valid_city===false || this.valid_website===false);
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
     * @returns a boolean: true if the new data is valid, false otherwise
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
        if (this.user_prop.social_media){ // if social_media !== null
            this.links = this.user_prop.social_media;
        }
        this.available = this.user_prop.available;
    }

    /**
     * Save the new data on the server.
     */
    private async saveChanges() {
        let social_media: any[] | null;
        if (this.links[0].suffix === '' && this.links[1].suffix === '' && this.links[2].suffix === '' && this.links[3].suffix === ''){
            social_media = null;
        } else {
            social_media = [];
            for (let i = 0; i < this.links.length; i++){
                social_media.push({
                    prefix: this.links[i].prefix,
                    suffix: this.links[i].suffix
                });
            }
        }

        let user: User = {
            id: this.user_prop.id,
            first_name: this.first_name,
            last_name: this.last_name,
            is_admin: this.$store.state.auth.isAdmin,
            mail: this.mail,
            tel: this.tel,
            address: this.address,
            zip: this.zip,
            city: this.city,
            website: this.website,
            social_media: social_media,
            available: this.available,
            private: this.user_prop.private
        }
        try {
            const url = api(`users/${this.user_prop.id}`);
            await this.$axios.put(url, {user: user}, {headers: {'Content-Type': 'application/json'}});
            this.$store.commit('auth/SET_USER', user);
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}
