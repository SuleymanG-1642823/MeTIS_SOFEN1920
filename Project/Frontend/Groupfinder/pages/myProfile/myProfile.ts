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
    private user: User|null = null;

    private created(){
        this.user = this.$store.state.auth.user;
    }
}
