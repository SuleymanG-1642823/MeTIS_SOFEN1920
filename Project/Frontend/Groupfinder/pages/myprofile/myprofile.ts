import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import User from '../../types/user';
import UserData from '../../components/UserData/UserData';
import ProjectsOfUser from '../../components/ProjectsOfUser/ProjectsOfUser';
import SkillsOfUser from '../../components/SkillsOfUser/SkillsOfUser';
import EditUserData from '../../components/EditUserData/EditUserData';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import EditPreferences from '../../components/EditPreferences/EditPreferences';
import axios from 'axios';
import api from '@/helpers/Api';

@Component({
    components: {
        UserData,
        EditUserData,
        ProjectsOfUser,
        SkillsOfUser,
        ChangePassword,
        EditPreferences
    }
})
export default class MyProfile extends Vue {
    // DATA
    private user: User|null = null;
    private private_data: boolean = false;

    // LIFECYCLE HOOKS
    private created(){
        this.user = this.$store.state.auth.user;
        this.private_data = this.$store.state.auth.user.private;
    }

    // WATCHERS
    /**
     * This is a watcher on the member 'private_data', which means that this method is called every time this member changes.
     * This method will send the new value of the member to the database.
     * @param newValue the new value of the member private_data
     * @param oldValue the old value of the member private_data
     */
    @Watch('private_data')
    onPrivateDataChanged(newValue: boolean, oldValue: boolean){
        if (newValue != this.$store.state.auth.user.private){
            this.savePrivacySetting(this.$store.state.auth.user, newValue);
        }
    }

    // METHODS
    /**
     * Save the privacy settings of a user.
     * A user can choose to set his phone number, address, zip, city and mail visible for everyone or protected (= only visible for teammembers).
     * @param user the user whose privacy settings will be updated.
     * @param private_data true if the user wants his data to be protected, false if he wants his data to be public.
     */
    private async savePrivacySetting(user: User, private_data: boolean){
        let body: User = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            mail: user.mail,
            tel: user.tel,
            address: user.address,
            zip: user.zip,
            city: user.city,
            website: user.website,
            social_media: user.social_media,
            available: user.available,
            private: private_data
        }
        try {
            let url = api(`users/${user.id}`);
            await axios.put(url, {user: body}, {headers: {'Content-Type': 'application/json'}});
            this.$store.commit('auth/SET_USER', body);
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}
