import { Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class ProjectInformation extends Vue {
    mCreatedAt: string = '';
    
    @Prop(String) title: string;
    @Prop(String) description: string;
    @Prop(String) createdAt: string;
    @Prop(Array) categories!: string[];
    @Prop(String) creator: string;
    @Prop(Number) creatorID: number;
    created(){
        // check if date is valid
        if (isNaN(Date.parse(this.createdAt))){
            this.mCreatedAt = '';
        }
        else{
            this.mCreatedAt = this.createdAt
        }
    }

    /**
     * Redirects the current user to the chatpage to chat with the
     * user that has the given ID.
     * @param userID 
     */
    goToChatPage(userID: number){
        alert('TODO: implement chatpage');
    }

    get creatorUrl(): string {
        if (this.creatorID == this.$store.state.auth.user.id){
            return `/myprofile/`;
        } else {
            return `/userpage/${this.creatorID}`;
        }
    }
}