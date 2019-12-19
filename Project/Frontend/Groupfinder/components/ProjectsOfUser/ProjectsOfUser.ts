import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Project from '../../types/project';
import ProjectCardWithReviews from '../ProjectCardWithReviews/ProjectCardWithReviews';
import axios from 'axios';

@ Component({
    components:{
        ProjectCardWithReviews
    }
})
export default class ProjectsOfUser extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA
    private userID: number = 0;
    private projects_owner: Project[] = [];
    private projects_member: Project[] = [];

    // LIFECYCLE HOOKS
    private async mounted(){
        this.userID = this.userid_prop;
        try{
            const response = await axios.get(`http://localhost:4000/projects/owner/${this.userid_prop}`);
            this.projects_owner = response.data;
        } catch (err) {
            console.log(err);
        }
        try{
            const response = await axios.get(`http://localhost:4000/projects/teammember/${this.userid_prop}`);
            this.projects_member = response.data;
        } catch (err) {
            console.log(err);
        }
    }
}
