import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import User from '../../types/user';
import { resolve } from 'dns';

@Component({
    components: {}
})
export default class EditUserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    first_name: string = '';
    last_name: string = '';
    mail: string = '';
    tel: string = '';
    address: string = '';
    zip: string = '';
    city: string = '';
    website: string = '';
    social_media: Object = {};
    

    // LIFECYCLE HOOKS
    mounted(){
        this.resetFields(null);
    }

    // METHODS
    validateData(): boolean {
        // TODO
        return true;
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        if (this.validateData()){
            await this.saveChanges();
            this.$nextTick(() => {
                this.$refs.modal.hide();
            })
        }
        return;
    }

    resetFields(event: any): void {
        this.first_name = this.user_prop.first_name;
        this.last_name = this.user_prop.last_name;
        this.mail = this.user_prop.mail;
        this.tel = this.user_prop.tel;
        this.address = this.user_prop.address;
        this.zip = this.user_prop.zip;
        this.city = this.user_prop.city;
        this.website = this.user_prop.website;
        this.social_media = this.user_prop.social_media;
    }

    async saveChanges() {
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
            social_media: '{}'
        }
        try {
            let url = `http://localhost:4000/users/${this.user_prop.id}`;
            axios.put(url, {user: user}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}
