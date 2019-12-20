import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserData from '../../components/UserData/UserData';
import ProjectsOfUser from '../../components/ProjectsOfUser/ProjectsOfUser';
import SkillsOfUser from '../../components/SkillsOfUser/SkillsOfUser';
import User from '../../types/user';
import axios from 'axios';

@Component({
    components: {
        UserData,
        ProjectsOfUser,
        SkillsOfUser
    }
})
export default class UserPage extends Vue {
    // DATA
    private user: User|null = null;
    

    // LIFECYCLE HOOKS
    private async created(){
        try{
            const response = await axios.get(`http://localhost:4000/users/${this.$route.params.id}`);
            this.user = response.data.user;
        } catch (err) {
            console.log(err);
        }
    }
}
