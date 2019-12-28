import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import api from '@/helpers/Api';

import Project from '@/types/project';

@ Component
export default class SidebarProjects extends Vue {
    // Data
    user_projects: Project[] = [];
    member_projects: Project[] = [];
    applied_projects: Project[] = [];

    // Methods
    getProjects(){
        let url = api(`projects/user/${this.$store.state.auth.user.id}`);
        axios.get(url)
        .then(response => {
            console.log(response.data);
            this.user_projects = response.data;
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the user's projects");
        })
    }

    getMemberProjects(){
        let url = api(`members/user/${this.$store.state.auth.user.id}`);
        axios.get(url)
        .then(response => {
            console.log(response.data);
            this.member_projects = response.data;
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the user's member projects");
        })
    }

    created(){
        this.getProjects();
        this.getMemberProjects();
    }

    async mounted() {
        this.$root.$on('refreshProjects', data => {
            console.log("caught emit");
            this.getProjects();
        });
    }
}
