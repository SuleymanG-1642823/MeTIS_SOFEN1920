import { Vue, Component, Prop} from 'vue-property-decorator'
import Profile from '~/types/profile'
import User from '~/types/user'
import Application, {APPLICATION_STATUS} from '~/types/application'
import Invite, {INVITE_STATUS} from '~/types/invite'
import Member from '~/types/member'
import Answer from '~/types/answer'
import axios from 'axios'
import api from '@/helpers/Api';

@Component
export default class ProjectProfileOwner extends Vue {
    membersCollapsed: boolean = true;
    collapseID: string = '';
    
    applicants: {user: User, application: Application}[] = [];
    invitees: {user: User, invite: Invite}[] = [];
    members: User[] = [];

    showAnswers: boolean = false;
    modalAnswers: Array<Answer> = [];
    modalTitle: string = 'Questionnaire answers';

    @Prop(Object) profile: Profile;

    /**
     * Retrieves missing information such as the 
     *   - members (users that are already accepted for the profile).
     *   - invitees (users that are invited for the profile).
     *   - applicants (users that applied for the profile).
     */
    created(){
        if (this.profile !== undefined){
            return new Promise<void>(async resolve => {
                // Get applicants, invitees and members
                this.applicants = await this.getApplicants();
                this.invitees = await this.getInvitees();
                this.members = await this.getMembers();
                
                // set unique collapse ID and assign it to the b-collapse tag
                // if multiple b-collapse tags have the same id, they affect each other
                this.collapseID = 'collapse-' + this.profile.id;
            });
        }
    }

    /**
     * Checks if there are any associated users, these are members, invitees, ...
     */
    hasAssociatedUsers(){
        if (this.members.length > 0)    return true;
        if (this.invitees.length > 0)   return true;
        if (this.applicants.length > 0) return true;

        return false;
    }

    /**
     * This method is called to update the membersCollapsed member. Each time 
     * the expand/collapse icon is clicked the value of the member is flipped.
     */
    onExpandCollapseClick(){
        this.membersCollapsed = !this.membersCollapsed;
    }

    /**
     * Remove the given user from being a member. Send a request to backend
     * to handle the data for this. If request succeeds remove member from the data memberlist
     */
    removeMember(memberID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`members/${memberID}/${this.profile.id}/${this.profile.project_id}`);
                await this.$axios.delete(url);

                // remove application object from component data
                this.removeMemberFromData(memberID);

                // end method successfully
                resolve();
            } catch (err) {
                console.log(`Error while removing member ${memberID}`);
                alert('Something went wrong while removing member. Please try again if member is not removed.');
                reject();
            }
        });
    }

    /**
     * Removes member with given index from members.
     */
    removeMemberFromData(memberID: number){
        // find member index
        let indexToRemove = -1;
        for (let i = 0; i < this.members.length; i++){
            if (this.members[i].id === memberID){
                indexToRemove = i;
                break;
            }
        }

        // remove element on index indexToRemove if given id was found
        if (indexToRemove > -1){
            this.members.splice(indexToRemove, 1);
        }
    }

    /**
     * Sends the request to the server to update the status of the application
     * to accepted.
     */
    acceptApplication(applicationID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`applications/status/${applicationID}/${APPLICATION_STATUS.ACCEPTED}`);
                await this.$axios.put(url);

                // remove application object from component data
                this.removeApplicant(applicationID);

                // update members
                this.members = await this.getMembers();

                // members section collapses for some reason -> fix
                //this.membersCollapsed = true;
                //this.membersCollapsed = false;

                // end method successfully
                resolve();
            } catch (err) {
                console.log(`Error while accepting application ${applicationID}`);
                alert('Something went wrong, could not accept application. Please try again.');
                reject();
            }
        });
    }

    declineApplication(applicationID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`applications/status/${applicationID}/${APPLICATION_STATUS.REJECTED}`);
                await this.$axios.put(url);

                // remove application object from component data
                this.removeApplicant(applicationID);

                // update members
                this.members = await this.getMembers();

                // end method successfully
                resolve();
            } catch (err) {
                console.log(`Error while accepting application ${applicationID}`);
                alert('Something went wrong, could not accept application. Please try again.');
                reject();
            }
        });
    }

    /**
     * Shows the given answers in a modal.
     * @param answers: answers to show
     */
    showApplicationAnswers(answers: Answer[], userName: string){
        if (userName !== undefined)
            this.modalTitle = this.profile.name + ' questionnaire answers of ' + userName;

        this.modalAnswers = answers;
        this.showAnswers = true;
    }

    cancelInvitation(invitationID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`invites/${invitationID}`);
                await this.$axios.delete(url);

                // remove application object from component data
                this.removeInvitationFromDataList(invitationID);

                // end method successfully
                resolve();
            } catch (err) {
                console.log(`Error while canceling invitation ${invitationID}`);
                alert('Something went wrong, could not cancel invitation. Please try again.');
                reject();
            }
        });
    }

    removeInvitationFromDataList(invitationID: number){
        // find index of application
        let indexToDelete = -1;
        for (let i = 0; i < this.invitees.length; i++){
            if (this.invitees[i].invite.id === invitationID){
                indexToDelete = i;
                break
            }
        }
        // removes element at given index
        if (indexToDelete > -1){
            this.invitees.splice(indexToDelete, 1);
        }
    }

    /**
     * Removes applicant object that contains application with given ID 
     */
    removeApplicant(applicationID: number){
        // find index of application
        let indexToDelete = -1;
        for (let i = 0; i < this.applicants.length; i++){
            if (this.applicants[i].application.id === applicationID){
                indexToDelete = i;
                break
            }
        }
        // removes element at given index
        if (indexToDelete > -1){
            this.applicants.splice(indexToDelete, 1);
        }
    }
    
    /**
     * Redirects to the chatpage to chat with the user that has the given ID.
     * @param chatPartnerID 
     */
    goToChatPage(chatPartnerID: number){
        alert('TODO: go to chatpage')
    }

    /** 
     * Requests the users that applied for this project from the backend
    */
    private getApplicants(){
        return new Promise<Array<{user: User, application: Application}>>(async (resolve: any, reject: any) => {
            try{
                // get the applicants for this profile
                let url = api(`applications/profile/${this.profile.id}`)
                const response = await this.$axios.get(url)
                let applications: Application[] = response.data;
                let result: {user: User, application: Application}[] = [];

                // we got the applications request user data
                // Only insert a new {application, user} object if the application status is pending
                for (let application of applications){
                    if (application.status === APPLICATION_STATUS.PENDING){
                        let url = api(`users/${application.user_id}`)
                        const response = await this.$axios.get(url)
                        let newApplicant: User = response.data.user;
                        result.push({user: newApplicant, application: application});
                    }
                }

                resolve(result);
            } catch (err) {
                console.log(`Error while requesting applicants for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
        });
    }

    /** 
     * Requests the users that are invited for this project from the backend
    */
    private getInvitees(){
        return new Promise<Array<{user: User, invite: Invite}>>(async (resolve: any, reject: any) => {
            try{
                // get the invitees for this profile
                let url = api(`invites/profile/${this.profile.id}`)
                const response = await this.$axios.get(url)
                let invites: Invite[] = response.data;
                let result: {user: User, invite: Invite}[] = [];

                // we got the invites, request user data
                // Only insert a new {invite, user} object if the invite status is pending
                for (let invite of invites){
                    if (invite.status === INVITE_STATUS.PENDING){
                        let url = api(`users/${invite.receiver_id}`)
                        const response = await this.$axios.get(url)
                        let newInvitee: User = response.data.user;
                        result.push({user: newInvitee, invite: invite});
                    }
                }

                resolve(result);
            } catch (err) {
                console.log(`Error while requesting invites for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
        });
    }

    /** 
     * Requests the users that are invited for this project from the backend
    */
    private getMembers(){
        return new Promise<User[]>(async (resolve: any, reject: any) => {
            try{
                // get the applicants for this profile
                let url = api(`members/profile/${this.profile.id}`);
                const response = await this.$axios.get(url);
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting members for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
            
        });
    }
}
