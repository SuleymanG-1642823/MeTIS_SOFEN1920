import { Vue, Component, Prop} from 'vue-property-decorator'
import Profile from '~/types/profile'
import User from '~/types/user'
import Application from '~/types/application'
import {APPLICATION_STATUS} from '~/types/application'
import Invite from '~/types/invite'
import Member from '~/types/member'
import axios from 'axios'
import api from '@/helpers/Api';
@Component
export default class ProjectProfileOwner extends Vue {
    membersCollapsed: boolean = true;
    collapseID: string = '';
    
    applicants: {user: User, application: Application}[] = [];
    invitees: {user: User, Invite: Application}[] = [];
    members: User[] = [];

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
                //this.invitees = await this.getInvitees();
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

    invitePeople(){
        alert('TODO: invite people');
    }

    removeMember(){
        alert('TODO: remove member');
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
                await axios.put(url);

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

    declineApplication(applicationID: number){
        return new Promise<void>(async (resolve: any, reject: any) => {
            try{
                // update application status
                let url = api(`applications/status/${applicationID}/${APPLICATION_STATUS.REJECTED}`);
                await axios.put(url);

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


    cancelInvitation(){
        alert('TODO: cancel invitation');
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
     * Requests the users that applied for this project from the backend
    */
    private getApplicants(){
        return new Promise<Array<{user: User, application: Application}>>(async (resolve: any, reject: any) => {
            try{
                // get the applicants for this profile
                let url = api(`applications/profile/${this.profile.id}`)
                const response = await axios.get(url)
                let applications: Application[] = response.data;
                let result: {user: User, application: Application}[] = [];

                // we got the applications request user data
                // Only insert a new {application, user} object if the application status is pending
                for (let application of applications){
                    if (application.status === APPLICATION_STATUS.PENDING){
                        let url = api(`users/${application.user_id}`)
                        const response = await axios.get(url)
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
        return new Promise<Array<{user: User, Invite: Invite}>>(async (resolve: any, reject: any) => {
            /*
            // get the applicants for this profile
            try{
                let url = api(`invitations/${this.profile.id}`);
                const response = await axios.get(url);
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting invitees for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
            */

            // TODO: uncomment the code above to do a request
            // Code below is for testing, remove when backend is ready
            let dummyinvitee1: User = {
                id: 62,
                first_name: 'Dore',
                last_name: 'Staquet',
                mail: 'staquet.dore@mail.com',
                address: '',
                zip: '',
                city: '',
                tel: '',
                website: '',
                social_media: null,
                available: true,
                private: false
            };

            resolve([dummyinvitee1]);
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
                const response = await axios.get(url);
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting members for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
            
        });
    }
}
