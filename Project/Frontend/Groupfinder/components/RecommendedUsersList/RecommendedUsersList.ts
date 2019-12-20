import {Vue, Component, Prop} from 'vue-property-decorator'
import ProfileUserMatch from '../../types/matching/profileUserMatch'
import RecommendedUserCard from '../RecommendedUserCard/RecommendedUserCard'
import Profile from '~/types/profile';
import UserMatch from '~/types/matching/userMatch';

/*
    This component is created for displaying a user that is recommended to a project's profile. 
*/
@Component({
    components:{
        RecommendedUserCard
    }
})
export default class RecommendedUsersList extends Vue{
    mProfileUserMatches: Array<{profile: Profile, userMatch: UserMatch}> = [];
    @Prop(Array) profileUserMatches: Array<ProfileUserMatch>;

    /**
     * Puts prop into mProfileUserMatch member that is seen as vue 
     * "data" and is reactive.
     */
    created(){
        for (let profileUserMatch of this.profileUserMatches){
            for (let uMatch of profileUserMatch.userMatches){
                this.mProfileUserMatches.push(
                    {
                        profile: profileUserMatch.profile,
                        userMatch: uMatch
                    }
                );
            }
        }
    }
}
