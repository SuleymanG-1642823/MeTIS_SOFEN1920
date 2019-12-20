import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import ProjectEdit from '~/components/ProjectEdit/ProjectEdit.vue';
import loadingSpinner from '~/components/loadingSpinner.vue';
import api from '@/helpers/Api'

import Project from '../../types/project';
import Profile from '../../types/profile';
import { is } from '@babel/types';

@ Component({
    components: {ProjectEdit, loadingSpinner}
})
export default class editProject extends Vue {
    // Data
    project= <Project>{};
    id: string;

    gotResponse: boolean = false;

    created(){
        // TODO: Check if this user is allowed to edit this project before proceeding
        this.id = this.$route.params.id;
        this.getProject(this.id);
    }

    mounted(){
    }

    /**
     * When the project gets edited in a child component it needs to be edited in the parent component by calling this emit
     * @param new_project new version of the project
     */
    update_project(new_project: Project){
        this.project = new_project;
    }
    
    /**
     * Gets the project from the database
     * @param project_id 
     */
    async getProject(project_id: string){
        let url = api(`projects/${project_id}`);
        const response = await axios.get(url);
        axios.get(url)
        .then(response => {
            this.project = response.data.project;
            console.log(this.project.profiles[0].skills);
            this.fillQuestionsInProfiles();
            this.stopLoadingAnimation();
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the project information");
        })
    }

    /**
     * Checks the project object and fills all the undefined questions
     */
    fillQuestionsInProfiles(){
        for (let i in this.project.profiles){
            if (this.project.profiles[i].questions == null){
                this.project.profiles[i].questions = [];
            }
        }
    }

    /**
     * Makes the loading animation stop
     */
    stopLoadingAnimation(){
        this.gotResponse = true;
    }

    /**
     * submits the project to the database to update is
     * @param evt 
     */
    async updateProject(evt: any){
        evt.preventDefault();
        console.log(this.project);

        this.project.edited_at = this.getCurrentDate();

        try {
            let url = api(`projects/${this.id}`);
            axios.put(url, {project_id: this.id, project: this.project} );
            // TODO: push to project view
            // this.$router.push('/recommendedProjects');
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
