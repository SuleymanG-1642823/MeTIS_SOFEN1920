import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Project from '../../types/project';
import axios from 'axios';

@ Component
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA
    userID: number = 0;
    projects: Project[] = [];

    // LIFECYCLE HOOKS
    async mounted(){
        this.userID = this.userid_prop;
        /*try{
            const response = await axios.get(`http://localhost:4000/`); // TODO
            this.projects = response.data;
        } catch (err) {
            console.log(err);
        }*/
    }
}
