import Vue from 'vue';
import VueRouter from 'vue-router'
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import ProjectEdit from '~/components/ProjectEdit/ProjectEdit.vue';
import loadingSpinner from '~/components/loadingSpinner.vue';
import api from '@/helpers/Api';
import GetDate from '@/helpers/GetDate';

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
    modalShow: Boolean = false;
    categoriesNotValidated: string = "false";

    gotResponse: boolean = false;

    created(){
        // TODO: Check if this user is allowed to edit this project before proceeding
        this.id = this.$route.params.id;
        this.getProject(this.id);
    }

    mounted(){
    }

    beforeRouteLeave(to: any, from: any, next: any) {
        console.log("beforeRouteLeave");
        if(window.confirm('Do you really want to leave? You have unsaved changes!')){
            next()
        }
        else{
            next(false);
        }
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
            console.log("Project categories gotten: ", this.project.categories);
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
     * validates if a checkbox from the categories is checked
     * @return returns a boolean saying true if one or more checkboxes or checked,
     * otherwise returns false
     */
    validateCategoriesInForm(): boolean{
        if(this.project.categories.length == 0){
            this.categoriesNotValidated = "true";
            return false;
        }
        else{
            this.categoriesNotValidated = "false";
            return true;
        }
    }

    /**
     * validates the form
     * @return returns a boolean saying true if the form is correctly filled in,
     * otherwise returns false
     */
    validateForm(): boolean{
        if(this.validateCategoriesInForm()){
            this.modalShow = false;
            return true;
        };
        this.modalShow = true;
        return false;
    }

    /**
     * submits the project to the database to update is
     * @param evt 
     */
    async updateProject(evt: any){
        evt.preventDefault();
        console.log(this.project);

        if(!(this.validateForm())){
            console.log("not validated");
            return;
        }

        this.project.edited_at = GetDate();

        try {
            let url = api(`projects/${this.id}`);
            axios.put(url, {project_id: this.id, project: this.project} );
            // TODO: push to project view
            // this.$router.push('/recommendedProjects');
        } catch (err){
            console.log('Error while posting project.')
        }
    }
}
