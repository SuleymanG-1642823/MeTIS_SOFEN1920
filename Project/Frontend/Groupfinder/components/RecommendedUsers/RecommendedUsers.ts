import {Vue, Component, Prop} from 'vue-property-decorator'
import ProfileUserMatch from '../../types/matching/profileUserMatch'
import RecommendedUserCard from '../RecommendedUserCard/RecommendedUserCard'
import Profile from '~/types/profile';
import UserMatch from '~/types/matching/userMatch';
import axios from 'axios'
import api from '@/helpers/Api';

/*
    This component is created for displaying a user that is recommended to a project's profile. 
*/
@Component({
    components:{
        RecommendedUserCard
}
})
export default class RecommendedUsers extends Vue{
    profileUserMatches: Array<ProfileUserMatch> = [];
    @Prop(Number) projectID: number;

    /**
     * Puts prop into mProfileUserMatch member that is seen as vue 
     * "data" and is reactive.
     */
    created(){
        return new Promise<void>(async resolve => {
            let projectID = this.$route.params.id;
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`users/matchFor/${this.projectID}`)
                
                // returns Array<ProfileUserMatch>
                const response = await this.$axios.get(url)
                this.profileUserMatches = response.data
            } catch (err) {
                console.log('Error while fetching user data.')
            }
        });
    }

    /**
     * Returns an array of {profile, userMatch} objects instead of an
     * array with elemets such as {profile, userMatch[]}. This is useful
     * for v-for when you want to get all userMatchCards on the same DOM level.
     * 
     * Example: if the matches where [{A, [1, 2]}, {B, [7, 8, 9]}] this
     * function returns [{A, 1}, {A, 2}, {B, 7}, ...]
     * 
     * Returns at most 10 {Profile, userMatch} objects
     */
    getVariantMatches(): Array<{profile: Profile, userMatch: UserMatch}>{
        let matches: Array<{profile: Profile, userMatch: UserMatch}> = [];

        for (let profileUserMatch of this.profileUserMatches){
            for (let uMatch of profileUserMatch.userMatches){
                matches.push(
                    {
                        profile: profileUserMatch.profile,
                        userMatch: uMatch
                    }
                );
            }
        }

        // sort on matching percentage
        // sort users per profile
        matches.sort((profileMatch1, profileMatch2) => profileMatch2.userMatch.matchingPercentage - profileMatch1.userMatch.matchingPercentage);

        return matches.splice(0, 10);;
    }
}
