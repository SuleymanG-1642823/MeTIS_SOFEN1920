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
    nRatings: number = 0;
    avgRating: number = 0;
    
    // LIFECYCLE HOOKS
    async mounted(){
        this.project = this.project_prop;
        try{
            const response = await axios.get(`http://localhost:4000/reviews/receiver/${this.userID_prop}`);
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

    calcAvgRating(): void {
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
