import { Vue, Component, Watch } from 'vue-property-decorator'
import axios from 'axios'
import api from '@/helpers/Api'
import Project from '~/types/project'
import Profile from '~/types/profile'
import RecommendedUsers from '~/components/RecommendedUsers/RecommendedUsers'
import Invite, { INVITE_STATUS } from '~/types/invite'
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
    showInvites: boolean = false;
    showInviteInfoModal: boolean = false;

    /* For dropdown to select profile */
    selectionProfileOptions: {value: Profile, text: string}[] = [];
    selectedProfile: Profile|null = null;
    
    /* For search input */
    inviteSearchInput: string = '';
    
    /* For selection list to select a suggestion */
    searchSuggestions: {value: User, text: string}[] = [];
    selectedSuggestion: User|null = null;
    showSuggestions: Boolean = false;


    // Array of {Invite, User} array.
    // ProfileInvites[profileID] gives an array of all invites sent for that 
    // profile along with the user objects that represent the invite receivers.
    profileInvites: {invite: Invite, user: User}[][] = [];

    /**
     * When the user has input more than 3 characters request suggestions from the server.
     * When the user wrote less than 3 characters (or deleted input) remove current suggestions.
     * @param newSearchValue 
     * @param oldSearchValue 
     */
    @Watch('inviteSearchInput')
    updateSuggestions(newSearchValue: string, oldSearchValue: string){
        if (newSearchValue.length >= 3){
            this.showSuggestions = true;
            this.updateUserSuggestions(newSearchValue);
        }
        else{
            this.showSuggestions = false;
        }
        
        // When there is input, the selected suggestion must be deselected
        if (this.selectedSuggestion === null || this.getFullName(this.selectedSuggestion) !== this.inviteSearchInput){
            this.selectedSuggestion = null;
        }
    }

    /**
     * Sets input field text to the selected suggestions' text
    */
    @Watch('selectedSuggestion')
    setSearchTextToSelectedValue(newSelectedValue: User|null, oldSelectedValue:User|null){
        if (this.selectedSuggestion !== null){
            this.inviteSearchInput = this.getFullName(this.selectedSuggestion);
        }
    }

    beforeCreate(){
        // Requests
        return new Promise<void>(async resolve => {
            let projectID = this.$route.params.project_id;
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`projects/${projectID}`)
                const response = await this.$axios.get(url)
                this.project = response.data.project;

                // if check needed for making typescript stop complaining
                if (this.project !== null){
                    // Got project, init options for profile selection of invite
                    for (let profile of this.project.profiles){
                        this.selectionProfileOptions.push({value: profile, text: profile.name});
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

    async updateUserSuggestions(queryStr: string){
        try{
            // Get the suggestions
            let url = api(`users/suggestions/${queryStr}`);
            let response = await this.$axios.get(url);

            // update search suggestions
            this.searchSuggestions = []; // delete previous suggestions
            let suggestedUsers: User[] = response.data;
            for (let user of suggestedUsers){
                // create a new suggestion object and insert it into the list bound with the dropdown elem
                this.searchSuggestions.push({value: user, text: user.first_name + ' ' + user.last_name});
            }

        } catch (err) {
            console.log(`Error while updating suggestions ${queryStr}`);
        }
    }

    /**
     * Requests and returns the invites sent for profile with given id.
     */
    getProfileInvites(profileID: number): Promise<Invite[]>{
        return new Promise<Invite[]>(async resolve => {
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`invites/profile/${profileID}`)
                const response = await this.$axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting invites for profile ${profileID}: ${err.response.data}`)
            }
        });
        
    }

    /**
     * Creates a new invite and requests server to register it.
     * @pre a suggestion must be selected
     * @pre a profile must be selected
     */
    async inviteUserCurrentlySelectedUser(){
        // check if a profile and a suggestion is selected
        if (this.selectedProfile === null || this.selectedSuggestion === null){
            this.showInviteInfoModal = true;
            return; // abort function
        }
        
        // to make typescript not complain about number|null not being assignable 
        // to number (eventough the first line does the check).
        let selectedUserID: any = this.selectedSuggestion.id;
        let selectProfileID: any = this.selectedProfile.id;

        // necessary items selected, create an invite and send a post request
        try {
            // Create an invite
            let newInvite: Invite = {
                id: null,
                sender_id: this.$store.state.auth.user.id,
                receiver_id: selectedUserID, 
                profile_id: selectProfileID,
                status: INVITE_STATUS.PENDING,
                sent_count: 0,
                max_count: 0,
                last_sent_at: ''
            }

            // send post request for registering invite
            let url = api(`invites/`)
            await this.$axios.post(url, {invite: newInvite});

            // successfully sent invitation, clear search field
            this.inviteSearchInput = '';

            // add new invite object to 
            // profileInvites: {invite: Invite, user: User}[][] = [];
            this.profileInvites[selectProfileID].push({invite: newInvite, user: this.selectedSuggestion});

            // new invite sent, update invites
            this.updateInvites();
        } catch (err) {
            console.log(`Error while sending invitation for user ${selectedUserID}: ${err.response.data}`)
        }
    }

    /**
     * Requests and returns user object of given user.
     */
    getUser(userID: number): Promise<User>{
        return new Promise<User>(async resolve => {
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`users/${userID}`)
                const response = await this.$axios.get(url)
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
                await this.$axios.delete(url);

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

    getFullName(user: User){
        return user.first_name + ' ' + user.last_name;
    }
}