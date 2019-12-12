import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';
import UserData from '../../components/UserData/UserData';
import ProjectsOfUser from '../../components/ProjectsOfUser/ProjectsOfUser';
import SkillsOfUser from '../../components/SkillsOfUser/SkillsOfUser';
import EditUserData from '../../components/EditUserData/EditUserData';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

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
    //private user: User|null = null;
    private user: User = {
        id: 3,
        first_name:  'Mart',
        last_name: 'Bolink',
        mail: 'Mart.Bolink@mail.com',
        address: 'kerkstraat 100',
        zip: '3500',
        city: 'Brussel',
        tel: '+32000112233',
        website: 'www.mywebsite.be',
        social_media: {}
    }

    private mounted(){
        // TODO: get data from vuex store
    }
}
