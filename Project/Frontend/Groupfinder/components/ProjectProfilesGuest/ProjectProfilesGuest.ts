import { Vue, Component, Prop} from 'vue-property-decorator'
import ProjectProfileGuest from './ProjectProfileGuest'
import Profile from '~/types/profile'

@Component({
    components:{
        ProjectProfileGuest
    }
})
export default class ProjectProfilesGuest extends Vue {
    checkedProfiles: number[] = [];
    showModal: boolean = false;

    @Prop(Array) profiles: Profile[];
    
    /**
     * Saves the given profile ID in checkedProfiles. This function must only be used when
     * ProjectProfilEGuest child component emits a signal that it is checked. The profile id 
     * is passed with the emit signal and saved by this function.
     * @param profileID 
     */
    onProfileChecked(profileID: number){
        if (!this.checkedProfiles.includes(profileID)){
            this.checkedProfiles.push(profileID);
        }
    }

    /**
     * Deletes the given profile ID from checkedProfiles. This function must only be used when
     * ProjectProfilEGuest child component emits a signal that it is unchecked. The profile id 
     * is passed with the emit signal and deleted from the list by this function.
     * @param profileID 
     */
    onProfileUnchecked(profileID: number){
        let index = this.checkedProfiles.indexOf(profileID);
        if (index > -1){
            this.checkedProfiles.splice(index, 1); // remove element on "index"
        }
    }

    redirectToApplicationPage(){
        if (this.checkedProfiles.length === 0){
            this.showModal = true;
        }
        else{
            alert('TODO: redirect to application page with profile ids: ' + this.checkedProfiles);
        }
    }
}