import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Project from '../../types/project';
import Profile from '../../types/profile';
import Questionnaire from '../../types/questionnaire'

@ Component({
    components: {profileForm}
})
export default class ProjectEdit extends Vue {
    // Data
    categories: Array<any> = [{text:"Select One", value: null}, "Website", "Native Application", "Smartphone Application"]
    index: number = 0

    // TODO: this needs to go into the Project object
    selectedCategory: string;

    @Prop({default: {}}) project: Project;

    created(){
    }

    // Methods
    /**
     * Adds a profile to the profile form
     */
    addProfile(){
        this.index = this.index.valueOf() + 1
        let new_profile = <Profile>{};
        new_profile.id = this.index;
        new_profile.name = "";
        let new_questionnaire = <Questionnaire>{};
        new_questionnaire.questions = [];
        new_profile.questionnaire = new_questionnaire;
        this.project.profiles.push(new_profile);
        console.log(this.project);
        this.$forceUpdate();
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
}
