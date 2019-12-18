import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'
import ProjectEdit from '~/components/ProjectEdit/ProjectEdit.vue'
import api from '@/helpers/Api'

import Project from '../../types/project';
import Profile from '../../types/profile';

@ Component({
    components: {ProjectEdit}
})
export default class projectCreationForm extends Vue {
    // Data
    project= <Project>{};

    created(){
    }

    mounted(){
        this.project = {
            id: null,
            name: "",
            status: 0,
            pitch: "",
            created_at: "",
            edited_at: "",
            creator_id: 1,
            creator_first_name: "",
            creator_last_name: "",
            profiles: []
        }
    }

    /**
     * When the project gets edited in a child component it needs to be edited in the parent component by calling this emit
     * @param new_project new version of the project
     */
    update_project(new_project: Project){
        this.project = new_project;
        console.log(this.project);
        this.$forceUpdate();
    }

    /**
     * submits the project to the database
     * @param evt 
     */
    async submitProject(evt: any){
        evt.preventDefault();

        // Fill in the details of the project
        this.project.status = 0;
        this.project.creator_id = this.$store.state.auth.user.id;
        this.project.creator_first_name = this.$store.state.auth.user.first_name;
        this.project.creator_last_name = this.$store.state.auth.user.last_name;
        // TODO category
        this.project.created_at = this.getCurrentDate();
        this.project.edited_at = this.getCurrentDate();

        // Post
        try {
            let url = api(`projects/`);
            axios.post(url, this.project);
            // TODO: rout to project page
            this.$router.push('/recommendedProjects');
        } catch (err){
            console.log('Error while posting project.')
        }
    }

    // Returns date string in format 'YYYY-MM-DD hh:mm:ss'
    getCurrentDate(){
        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1; // Starts at 0
        let monthString: string;
        if (month < 10){
            monthString = '0' + month.toString();
        }
        else {
            monthString = month.toString();
        }
        let day: number = date.getDate();
        let dayString: string;
        if (day < 10){
            dayString = '0' + day.toString();
        }
        else {
            dayString = day.toString();
        }
        let hour: number = date.getHours();
        let hourString: string;
        if (hour < 10){
            hourString = '0' + hour.toString();
        }
        else {
            hourString = hour.toString();
        }
        let minutes: number = date.getMinutes();
        let minutesString: string;
        if (minutes < 10){
            minutesString = '0' + minutes.toString();
        }
        else {
            minutesString = minutes.toString();
        }
        let seconds: number = date.getSeconds();
        let secondsString: string;
        if (seconds < 10){
            secondsString = '0' + seconds.toString();
        }
        else {
            secondsString = seconds.toString();
        }
        let dateString = year.toString() + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minutesString + ':' + secondsString;
        
        return dateString;
    }
}
