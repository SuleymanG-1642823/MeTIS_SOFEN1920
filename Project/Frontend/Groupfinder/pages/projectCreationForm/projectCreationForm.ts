import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Project from '../../types/project';
import Profile from '../../types/profile';

@ Component({
    components: {profileForm}
})
export default class projectCreationForm extends Vue {
    // Data
    profilesList: Array<String> = [];
    listOfProfiles: Array<Profile> = [];
    form: any = {
        projectName: "",
        pitch: "",
        category: null
    }
    categories: Array<any> = [{text:"Select One", value: null}, "Website", "Native Application", "Smartphone Application"]
    index: number = 0
    /*
    components: {
        'profileFormComponent': profileForm
    }*/

    created(){
        // this.addProfile();
    }

    // Methods
    /**
     * Adds a profile to the profile form
     */
    addProfile(){
        this.index = this.index.valueOf() + 1
        let new_profile = <Profile>{}
        new_profile.id = this.index
        new_profile.name = ""
        new_profile.project_id = 1
        this.listOfProfiles.push(new_profile);
    }

    /**
     * Deletes the profileform of the given profile
     * @param value The profile the user wants to delete
     */
    deleteProfileForm(value: Profile){
        let index = this.listOfProfiles.indexOf(value, 0)
        if(index > -1){
            this.listOfProfiles.splice(index, 1)
        }
    }

    /**
     * submits the project to the database
     * @param evt 
     */
    async submitProject(evt: any){
        evt.preventDefault();

        let project = <Project>{};

        project.name = this.form.projectName;
        project.pitch = this.form.pitch;
        project.status = 0;
        project.profiles = this.listOfProfiles;
        // TODO category

        try {
            let url = "http://localhost:4000/projects/";
            axios.post(url, project);
            //const response = await axios.post(`http://localhost:4000/projects/${project}`);
        } catch (err){
            console.log('Error while posting project.')
        }
    }
}
