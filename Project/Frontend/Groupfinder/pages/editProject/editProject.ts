import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import ProjectEdit from '~/components/ProjectEdit/ProjectEdit.vue';
import loadingSpinner from '~/components/loadingSpinner.vue';

import Project from '../../types/project';
import Profile from '../../types/profile';
import { is } from '@babel/types';

@ Component({
    components: {ProjectEdit, loadingSpinner}
})
export default class editProject extends Vue {
    // Data
    project: Project;
    id: string;

    gotResponse: boolean = false;

    created(){
        this.id = this.$route.params.id;
        this.getProject(this.id);
    }

    mounted(){
    }
    
    /**
     * Gets the project from the database
     * @param project_id 
     */
    async getProject(project_id: string){
        let url = `http://localhost:4000/projects/${project_id}`;
        const response = await axios.get(url);
        axios.get(url)
        .then(response => {
            console.log(response.data.project);
            this.project = response.data.project;
            this.stopLoadingAnimation();
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the project information");
        })
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

        this.project.edited_at = this.getCurrentDate();

        try {
            let url = `http://localhost:4000/projects/${this.id}`;
            axios.put(url, {project_id: this.id, project: this.project} );
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
