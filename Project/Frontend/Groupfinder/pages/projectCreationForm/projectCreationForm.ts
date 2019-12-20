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
            profiles: [],
            categories: []
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

        // project.name = this.form.projectName;
        // project.pitch = this.form.pitch;
        this.project.status = 0;
        // project.profiles = this.listOfProfiles;
        // TODO: use stored id
        this.project.creator_id = 1;
        this.project.creator_first_name = 'Lennert';
        this.project.creator_last_name = 'Geebelen';
        // TODO category
        this.project.created_at = this.getCurrentDate();
        this.project.edited_at = this.getCurrentDate();

        try {
            let url = api(`projects/`);
            // let url = "http://localhost:4000/projects/";
            axios.post(url, this.project);
            //const response = await axios.post(`http://localhost:4000/projects/${project}`);
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
