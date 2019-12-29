import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';
import api from '@/helpers/Api';
import axios from 'axios';
import Review from '../../types/review';

@Component({
    components: {
    }
})
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    private privateData: boolean = false;
    private user: User|null = null;
    private logged_in_user: boolean = false;
    private rating: number = 0;
    private nRatings: number = 0;
    private social_media: any[]|null = null;

    // LIFECYCLE HOOKS
    private async mounted(){
        this.user = this.user_prop;
        this.privateData = this.user_prop.private;
        this.logged_in_user = (this.$store.state.auth.user.id == this.user_prop.id);
        const reviews: Review[] = await this.fetchReviews();
        this.rating = this.calculateAvgRating(reviews);
        this.social_media = this.user_prop.social_media;
    }

    /**
     * From all ratings, calculate the average rating.
     * @param reviews all reviews for the current user
     */
    private calculateAvgRating(reviews: Review[]): number {
        let nRatings: number = 0;
        let sum: number = 0;
        for (let i = 0; i < reviews.length; i++){
            nRatings++;
            sum += reviews[i].rating;
        }
        this.nRatings = nRatings;
        if (nRatings == 0){
            return 0;
        } 
        else {
            return (sum / nRatings);
        }
    }

    /**
     * Fetch all reviews for this user from the database.
     */
    private fetchReviews(): Promise<Review[]> {
        return new Promise(
            async (resolve, reject) => {
                try{
                    const url: string = api(`reviews/receiver/${this.user_prop.id}`);
                    const response = await axios.get(url);
                    const reviews: Review[] = response.data;
                    resolve(reviews);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        );
    }
}