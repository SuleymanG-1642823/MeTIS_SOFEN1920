import { Vue, Component, Prop} from 'vue-property-decorator'
import Profile from '~/types/profile'
import User from '~/types/user'
import axios from 'axios'
import api from '@/helpers/Api';

@Component
export default class ProjectProfileGuest extends Vue {
    members: User[] = [];
    membersCollapsed: boolean = true;
    collapseID: string = '';

    @Prop(Object) profile: Profile;

    /**
     * Retrieves missing information such as the members (users that
     * are already accepted for the profile).
     */
    created(){
        return new Promise<void>(async (resolve: any, reject: any) => {
            if (this.profile !== undefined){
                // Get members
                this.members = await this.getMembers();
                
                // set unique collapse ID and assign it to the b-collapse tag
                // if multiple b-collapse tags have the same id, they affect each other
                this.collapseID = 'collapse-' + this.profile.id;
            }
        });
    }

    /**
     * Updates the checked member that represents the state of the checkbox
     */
    checkedUnChecked(checkBoxChecked: boolean){
        // emit signal to parent that profile is (un)checked
        if (checkBoxChecked){
            this.$emit('profile-checked', this.profile.id);
        }
        else{
            this.$emit('profile-unchecked', this.profile.id);
        }
    }

    /** 
     * Requests the users that are invited for this project from the backend
    */
    private getMembers(): Promise<Array<User>>{
        return new Promise<Array<User>>(async (resolve: any, reject: any) => {
            /*
            try{
                // get the applicants for this profile
                let url = api(`members/${this.profile.id}`)
                const response = await axios.get(url)
                resolve(response.data);
            } catch (err) {
                console.log(`Error while requesting members for profile ${this.profile.id}: ${err.response.data}`)
                reject();
            }
            */
        
           // TODO: uncomment the code above to do a request
           // Code below is for testing, remove when backend is ready
           let dummyMember1: User = {
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

            let dummyMember2: User = {
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
            resolve([dummyMember1, dummyMember2]);
        });
    }

    /**
     * This method is called to update the membersCollapsed member. Each time 
     * the expand/collapse icon is clicked the value of the member is flipped.
     */
    onExpandCollapseClick(){
        this.membersCollapsed = !this.membersCollapsed;
    }

    /**
     * Redirects to the chat page
     * @param userID 
     */
    goToChatPage(userID: number){
        alert('TODO: insert link tag to chat page');
    }
}