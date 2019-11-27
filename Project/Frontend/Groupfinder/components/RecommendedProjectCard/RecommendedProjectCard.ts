import {Vue, Component, Prop} from 'vue-property-decorator'
import Project from '../../types/project'
import Profile from '../../types/profile'

class ProfileMatch{
    id: number
    matchingPercentage: number
}

/*
    This component is created for displaying a project that is recommended to a user. 

    @pre: A project is recommended for it's profile matching rates. So the given project Object
    must contain at least one profile object, otherwise it is not possible for the project
    to be recommended in the first place. 

    TODO: sort data or not (is data sorted in back-end)?
*/
@Component
export default class RecommendedProjectCard extends Vue{
    @Prop(Object) readonly project: Project
    @Prop(Array) readonly profileMatches: Array<ProfileMatch>
    

    /**
     * If the given ID is valid (ID belongs to a profile in project) then the name of the profile with that ID is returned
     * otherwise '' is returned.
     */
    public getProfileName(profileID: number): string{
        for (let profile of this.project.profiles){
            if (profile.id === profileID){
                return profile.name;
            }
        }

        // if ID is not encountered -> invalid ID
        return '';
    }

    // Lifecycle hook, gets called after init component
    created(){
        // TODO: sort profiles by their matching %
    }
}
