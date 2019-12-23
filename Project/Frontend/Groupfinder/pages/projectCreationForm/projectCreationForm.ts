import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue';
import ProjectEdit from '~/components/ProjectEdit/ProjectEdit.vue';
import api from '@/helpers/Api';
import GetDate from '@/helpers/GetDate';

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

        // Fill in the details of the project
        this.project.status = 0;
        this.project.creator_id = this.$store.state.auth.user.id;
        this.project.creator_first_name = this.$store.state.auth.user.first_name;
        this.project.creator_last_name = this.$store.state.auth.user.last_name;
        this.project.created_at = GetDate();
        this.project.edited_at = GetDate();

        // Post
        try {
            let url = api(`projects/`);
            axios.post(url, this.project);
            this.$root.$emit('refreshProjects');
            // TODO: rout to project page
            this.$router.push('/recommendedProjects');
        } catch (err){
            console.log('Error while posting project.')
        }
    }
}
