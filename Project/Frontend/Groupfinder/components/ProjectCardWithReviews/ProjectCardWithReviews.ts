import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Project from '../../types/project';
import Review from '../../types/review';
import axios from 'axios';
import api from '@/helpers/Api';

@ Component
export default class ProjectCardWithReviews extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userID_prop: number;
    @Prop({type: Object, required: true}) readonly project_prop: Project;

    // DATA
    private project: Project|null = null;
    private buttonText: string = "Show reviews"
    private reviews: Review[] = [];
    private nRatings: number = 0;
    private avgRating: number = 0;
    
    // LIFECYCLE HOOKS
    private async mounted(){
        this.project = this.project_prop;
        try{
            const url = api(`reviews/receiver/${this.userID_prop}`);
            //const response = await this.$axios.get(`http://localhost:4000/reviews/receiver/${this.userID_prop}`);
            const response = await this.$axios.get(url);
            let allReviews: Review[] = response.data;
            let reviewsForProject = [];
            for (let i = 0; i < allReviews.length; i++){
                if (allReviews[i].project_id == this.project.id){
                    reviewsForProject.push(allReviews[i]);
                }
            }
            this.reviews = reviewsForProject;
            this.calcAvgRating();
        } catch (err) {
            console.log(err);
        }
    }

    // COMPUTED
    /**
     * Concat the first name with the last name of the creator of the project.
     */
    private get creatorName(){
        if (this.project){
            return `${this.project.creator_first_name} ${this.project.creator_last_name}`;
        } else {
            return '';
        }
    }

    // METHODS
    /**
     * Change the text of the button from 'show reviews' to 'hide reviews' and vice versa.
     */
    private changeButtonText(): void {
        if (this.buttonText == "Show reviews"){
            this.buttonText = "Hide reviews";
        } else {
            this.buttonText = "Show reviews";
        }
    }

    /**
     * Concat the first name with the last name.
     * @param first_name first name as a string.
     * @param last_name last name as a string.
     */
    private createFullName(first_name: string, last_name: string): string {
        return 'From: ' + first_name + ' ' + last_name;
    }

    /**
     * From all ratings, calculate the average rating.
     */
    private calcAvgRating(): void {
        let sum: number = 0;
        for (let i = 0; i < this.reviews.length; i++){
            this.nRatings++;
            sum += this.reviews[i].rating;
        }

        if (this.nRatings == 0){
            this.avgRating = 0;
        } 
        else {
            this.avgRating = (sum / this.nRatings);
        }
    }
}
