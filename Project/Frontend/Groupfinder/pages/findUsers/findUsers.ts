import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import api from '@/helpers/Api'
import Project from '~/types/project'
import RecommendedUsers from '~/components/RecommendedUsers/RecommendedUsers'
import Invite from '~/types/invite'
import User from '~/types/user'

@Component({
    components: {
        RecommendedUsers
    },
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.project_id)
    }
})
export default class FindUsers extends Vue {
    project: Project|null = null;
    selectionOptions: {value: Object|null, text: string}[] = [ {value: null, text: 'Please select a profile'}] ;
    selectedOption: Object|null = null;
    showInvites: boolean = false;

    // Array of {Invite, User} array.
    // ProfileInvites[profileID] gives an array of all invites sent for that 
    // profile along with the user objects that represent the invite receivers.
    profileInvites: {invite: Invite, user: User}[][] = [];

    beforeCreate(){
        // Requests
        return new Promise<void>(async resolve => {
            let projectID = this.$route.params.project_id;
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`projects/${projectID}`)
                const response = await axios.get(url)
                this.project = response.data.project;

                // if check needed for making typescript stop complaining
                if (this.project !== null){
                    // Got project, init options for profile selection of invite
                    for (let profile of this.project.profiles){
                        this.selectionOptions.push({value: profile, text: profile.name});
                    }
                    
                    try{
                        // Request invites sent for each profile
                        for (let profile of this.project.profiles){
                            let invites: Invite[] = await this.getProfileInvites(profile.id);
                            
                            // init list for invites
                            this.profileInvites[profile.id] = [];

                            // Request user objects of invitees
                            for (let invite of invites){
                                let invitedUser: User = await this.getUser(invite.receiver_id);
                                this.profileInvites[profile.id].push({invite: invite, user: invitedUser});
                            }
                        }
                    }catch(err){
                        console.log(`Error while requesting invite data for profiles`)
                    }
                }
            } catch (err) {
                console.log(`Error while requesting project ${projectID}`)
            }

            this.showInvites = true;
        });
    }

    /**
     * Requests and returns the invites sent for profile with given id.
     */
    getProfileInvites(profileID: number): Promise<Invite[]>{
        return new Promise<Invite[]>(async resolve => {
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`invites/profile/${profileID}`)
                const response = await axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting invites for profile ${profileID}: ${err.response.data}`)
            }
        });
    }

    /**
     * Requests and returns user object of given user.
     */
    getUser(userID: number): Promise<User>{
        return new Promise<User>(async resolve => {
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`users/${userID}`)
                const response = await axios.get(url)
                resolve(response.data.user);
            } catch (err) {
                console.log(`Error while requesting user ${userID}: ${err.response.data}`)
            }
        });
    }

    /**
     * Sends a request to delete given invite.
     * @param invitationID
     */
    cancelInvitation(invitationID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`invites/${invitationID}`);
                await axios.delete(url);

                // remove application object from component data
                this.removeInviteFromDataList(invitationID);

                // rerender invites
                this.updateInvites();

                // end method successfully
                resolve();
            } catch (err) {
                console.log(`Error while canceling invitation ${invitationID}`);
                reject();
            }
        });
    }

    /**
     * Remove invite from profileInvites
     */
    removeInviteFromDataList(inviteID: number){
        // look trough invite lists of profiles
        for (let i in this.profileInvites){
            // look trough invites of profile with id i (the objects are inserted with the profile id as index)
            for (let j in this.profileInvites[i]){
                // if current invite id matches with the given id, remove current element from the list and return
                if (this.profileInvites[i][j].invite.id === inviteID){
                    this.profileInvites[i].splice(parseInt(j), 1); // delete element
                    return;
                }
            }
        }
    }

    /**
     * The invites div has a v-if that shows the invites only if this.showInvites is true.
     * Setting that value to false and true rerenders the invites.
     */
    updateInvites(){
        this.showInvites = false;
        this.showInvites = true;
    }
}