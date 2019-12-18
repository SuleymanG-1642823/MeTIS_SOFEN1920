import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '../profileForm/profileForm';
// import profileForm from '~/components/profileForm/profileForm.vue'
import api from '@/helpers/Api';

import Project from '../../types/project';
import Profile from '../../types/profile';
import Questionnaire from '../../types/questionnaire';

@ Component({
    components: {profileForm}
})
export default class ProjectEdit extends Vue {
    // Data
    categories: Array<any> = [{text:"Select One", value: null}, "Website", "Native Application", "Smartphone Application"]
    index: number = 0

    // TODO: this needs to go into the Project object
    selectedCategory: string;

    // Stores all previously created questionnaires from this user
    userQuestionnaireList: Questionnaire[] = [];

    @Prop({default: {}}) project: Project;

    created(){
        // TODO: use actual user id
        this.getQuestionnaires(1);
    }

    // Methods
    /**
     * Adds a profile to the profile form
     */
    addProfile(){
        // Create temp project
        console.log(this.project);
        let local_project = this.project;
        this.index = this.index.valueOf() + 1
        let new_profile = <Profile>{};
        new_profile.id = this.index;
        new_profile.name = "";
        new_profile.questions = [];
        new_profile.skills = [];
        local_project.profiles.push(new_profile);
        // Emit new project
        this.$emit("update_project", local_project);
    }

    update_profile(new_profile: Profile){
        let local_project = this.project;
        local_project.profiles[new_profile.id] = new_profile;
        // Emit new project
        this.$emit("update_project", local_project);
    }

    /**
     * Deletes the profileform of the given profile
     * @param value The profile the user wants to delete
     */
    deleteProfileForm(value: Profile){
        let index = this.project.profiles.indexOf(value, 0);
        if(index > -1){
            this.project.profiles.splice(index, 1);
            this.$forceUpdate();
        }
    }

    /**
     * Gets all questionnaires from one user from the backend
     * @param user_id the id of the user
     */
    async getQuestionnaires(user_id: number){
        let url = api(`questionnaires/${user_id}`);
        // let url = `http://localhost:4000/questionnaires/${user_id}`;
        const response = await axios.get(url);
        axios.get(url)
        .then(response => {
            this.userQuestionnaireList = response.data;
            console.log(this.userQuestionnaireList);
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the questionnaires");
        })
    }
}
