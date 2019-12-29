import {Vue, Component, Prop} from 'vue-property-decorator'
import UserMatch from '../../types/matching/userMatch'
import Profile from '../../types/profile'
import axios from 'axios'
import api from '@/helpers/Api'
import Skill from '~/types/skill'

/*
    This component is created for displaying a user that is recommended to a project's profile. 
*/
@Component
export default class RecommendedUserCard extends Vue{
    mNumfullStars: number = 0;
    mHalfStar: boolean = false;
    mNumEmptyStars: number = 5;
    mMaxStars: number = 5;
    mUserSkill: Skill[] = [];

    @Prop(Object) userMatch: UserMatch
    @Prop(Object) profile: Profile

    created(){
        // calculate how many of what stars to show for rating
        // rating is matchingPercentage represente with stars
        this.mNumfullStars = this.fullStars();
        this.mHalfStar = this.halfStar();
        this.mNumEmptyStars = this.emptyStars();

        if (this.mHalfStar === true && this.mNumEmptyStars >= 1){
            this.mNumEmptyStars--;
        }

        return new Promise<void>(async resolve => {
            this.mUserSkill = await this.getUserSkills();
        });
    }

    fullStars(){
        return Math.floor(this.userMatch.matchingPercentage * (this.mMaxStars/100));
    }

    halfStar(){
        let remainderFullstars = this.userMatch.matchingPercentage * (this.mMaxStars/100) - this.fullStars();
        if (remainderFullstars >= 0.5){
            return true;
        }
        else{
            return false;
        }
    }

    emptyStars(){
        return this.mMaxStars - Math.floor(this.userMatch.matchingPercentage * (this.mMaxStars/100));
    }

    getUserSkills(){
        return new Promise<Skill[]>(async (resolve: any, reject: any) => {
            try {
                // Get all skills of user
                let url = api(`users_skills/${this.userMatch.user.id}`)
                const response = await axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting user skills for user ${this.userMatch.user.id}: ${err.response.data}`)
                reject();
            }
        });
    }
}
