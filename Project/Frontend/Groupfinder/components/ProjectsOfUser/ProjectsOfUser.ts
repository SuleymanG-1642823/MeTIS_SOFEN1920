import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Project from '../../types/project';
import ProjectCardWithReviews from '../ProjectCardWithReviews/ProjectCardWithReviews';
import axios from 'axios';
import api from '@/helpers/Api';

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
            const url = api(`projects/owner/${this.userid_prop}`);
            const response = await axios.get(url);
            this.projects_owner = response.data;
        } catch (err) {
            console.log(err);
        }
        try{
            const url = api(`projects/teammember/${this.userid_prop}`);
            const response = await axios.get(url);
            this.projects_member = response.data;
        } catch (err) {
            console.log(err);
        }
    }
}
