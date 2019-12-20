import {Vue, Component, Prop} from 'vue-property-decorator'
import UserMatch from '../../types/matching/userMatch'
import Profile from '../../types/profile'

/*
    This component is created for displaying a user that is recommended to a project's profile. 
*/
@Component
export default class RecommendedUserCard extends Vue{
    mUserMatch: null|UserMatch = null;
    mProfile: null|Profile = null;

    @Prop(Object) userMatch: UserMatch
    @Prop(Object) profile: Profile

    /**
     * Puts prop into mProfileUserMatch member that is seen as vue 
     * "data" and is reactive.
     */
    created(){
        this.mUserMatch = this.userMatch;
        this.mProfile = this.profile;
    }

    /**
     * Returns true if props userMatch and profile have data passed to them.
     */
    public dataReceived() {
        return this.mUserMatch != null && this.mProfile != null;
    }
}
