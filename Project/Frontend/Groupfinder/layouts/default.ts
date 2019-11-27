import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import Component from 'vue-class-component';
import axios from 'axios';

import Sidebar from '~/components/Sidebar/Sidebar.vue'

@ Component({
    components: {Sidebar}
})
export default class MainLayout extends Vue {
    // Components
    components: { 'Sidebar': Sidebar }

    // Data
    content_type: String;

    // Methods
    created(){
        this.content_type = "helloworld";
    }

    async mounted() {
    }
}