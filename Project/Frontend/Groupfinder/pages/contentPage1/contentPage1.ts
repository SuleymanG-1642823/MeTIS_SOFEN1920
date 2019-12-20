import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';

@ Component({
})
export default class contentPage1 extends Vue {

    // Data
    component_title: String;

    // Methods
    created(){
        this.component_title = "component title";
    }

    async mounted() {
    }
}