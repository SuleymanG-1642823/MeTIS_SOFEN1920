import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Project from '../../types/project';
import Review from '../../types/review';
import axios from 'axios';

@ Component
export default class BasicProjectCard extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userID_prop: number;
    @Prop({type: Object, required: true}) readonly project_prop: Project;

    // DATA
    project: Project|null = null;
    buttonText: string = "Show reviews"
    reviews: Review[] = [];

    // LIFECYCLE HOOKS
    async mounted(){
        this.project = this.project_prop;
        try{
            const response = await axios.get(`http://localhost:4000/reviews/receiver/3`);
            this.reviews = response.data;
        } catch (err) {
            console.log(err);
        }
    }

    // COMPUTED
    get creatorName(){
        if (this.project){
            return `${this.project.creator_first_name} ${this.project.creator_last_name}`;
        } else {
            return '';
        }
    }

    // METHODS
    changeButtonText(): void {
        if (this.buttonText == "Show reviews"){
            this.buttonText = "Hide reviews";
        } else {
            this.buttonText = "Show reviews";
        }
    }

    createFullName(first_name: string, last_name: string): string {
        return 'From: ' + first_name + ' ' + last_name;
    }
}
