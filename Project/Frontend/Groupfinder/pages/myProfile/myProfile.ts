import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import User from '../../types/user';
import UserData from '../../components/UserData/UserData';
import ProjectsOfUser from '../../components/ProjectsOfUser/ProjectsOfUser';
import SkillsOfUser from '../../components/SkillsOfUser/SkillsOfUser';
import EditUserData from '../../components/EditUserData/EditUserData';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import axios from 'axios';

@Component({
    components: {
        UserData,
        EditUserData,
        ProjectsOfUser,
        SkillsOfUser,
        ChangePassword
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
    @Watch('private_data')
    onPrivateDataChanged(newValue: boolean, oldValue: boolean){
        this.savePrivacySetting(this.$store.state.auth.user, newValue);
    }

    // METHODS
    private savePrivacySetting(user: User, private_data: boolean){
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
            social_media: '{}',
            available: user.available,
            private: private_data
        }
        try {
            let url = `http://localhost:4000/users/${user.id}`;
            axios.put(url, {user: body}, {headers: {'Content-Type': 'application/json'}});
        } catch (err){
            console.log(`Following error occured while updating user:\n${err}`);
        }
    }
}
