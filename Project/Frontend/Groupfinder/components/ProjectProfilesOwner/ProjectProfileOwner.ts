import { Vue, Component, Prop} from 'vue-property-decorator'
import Profile from '~/types/profile'
import User from '~/types/user'
import axios from 'axios'
import api from '@/helpers/Api';

@Component
export default class ProjectProfileOwner extends Vue {
    @Prop(Object) profile: Profile;
    applicants: User[] = [];
    invitees: User[] = [];
    members: User[] = [];
    membersCollapsed: boolean = true;
    collapseID: string = '';

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

    invitePeople(){
        alert('TODO: invite people');
    }

    removeMember(){
        alert('TODO: remove member');
    }

    acceptApplication(){
        alert('TODO: accept applic');
    }

    declineApplication(){
        alert('TODO: decline applic');
    }

    cancelInvitation(){
        alert('TODO: cancel invitation');
    }

    /** 
     * Requests the users that applied for this project from the backend
    */
    private getApplicants(){
        return new Promise<Array<User>>(async (resolve: any, reject: any) => {
            /*
            try{
                // get the applicants for this profile
                let url = api(`applications/${this.profile.id}`)
                const response = await axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting applicants for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
            */

            // TODO: uncomment the code above to do a request
            // Code below is for testing, remove when backend is ready
            let dummyApplicant1: User = {
                id: 60,
                first_name: 'Suleyman',
                last_name: 'Guney',
                mail: 'guney.suleyman@mail.com',
                address: '',
                zip: '',
                city: '',
                tel: '',
                website: '',
                social_media: null,
                available: true,
                private: false
            };

            let dummyApplicant2: User = {
                id: 61,
                first_name: 'Arno',
                last_name: 'Vertstraete',
                mail: 'vertstraete.arno@mail.com',
                address: '',
                zip: '',
                city: '',
                tel: '',
                website: '',
                social_media: null,
                available: true,
                private: false
            };

            resolve([dummyApplicant1, dummyApplicant2]);
        });
    }

    /** 
     * Requests the users that are invited for this project from the backend
    */
    private getInvitees(){
        return new Promise<Array<User>>(async (resolve: any, reject: any) => {
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
        return new Promise<Array<User>>(async (resolve: any, reject: any) => {
            /*
            try{
                // get the applicants for this profile
                let url = api(`members/${this.profile.id}`);
                const response = await axios.get(url);
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting members for profile ${this.profile.id}: ${err.response.data}`);
                reject();
            }
            */
            
           
           // TODO: uncomment the code above to do a request
           // Code below is for testing, remove when backend is ready
           let dummyMember1: User = {
               id: 63,
               first_name: 'Liese',
               last_name: 'Bekkers',
               mail: 'bekkers.liese@mail.com',
               address: '',
               zip: '',
               city: '',
               tel: '',
               website: '',
               social_media: null,
               available: true,
               private: false
            };

            let dummyMember2: User = {
                id: 63,
                first_name: 'Lennert',
                last_name: 'Gebelen',
                mail: 'lennert.gebelen@mail.com',
                address: '',
                zip: '',
                city: '',
                tel: '',
                website: '',
                social_media: null,
                available: true,
                private: false
             };
            
            resolve([dummyMember1, dummyMember2]);
        });
    }
}
