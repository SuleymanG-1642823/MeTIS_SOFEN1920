import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import Project from '../../types/project'
import api from '@/helpers/Api';
import ProjectInformation from '~/components/ProjectInformation/ProjectInformation'
import Category from '~/types/category'
import ProjectProfilesGuest from '~/components/ProjectProfilesGuest/ProjectProfilesGuest'
import ProjectProfilesOwner from '~/components/ProjectProfilesOwner/ProjectProfilesOwner'

@Component({
    components: {
        ProjectInformation,
        ProjectProfilesGuest,
        ProjectProfilesOwner
    },
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    }
})
export default class ProjectPage extends Vue {
    project: Project;
    notFound: boolean = true;
    isOwner: boolean = false;

    constructor(){
        super();

        // put dummy values in project, assigning null makes the app behave undeterministic
        this.project = {
            id: -1,
            name: '',
            pitch: '',
            created_at: '',
            edited_at: '',
            creator_id: 0,
            creator_first_name: '',
            creator_last_name: '',
            profiles: [],
            categories: [],
            status: 0
        }
    }

    beforeCreate(){
        return new Promise<void>(async resolve => {
            let projectID = this.$route.params.id;
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`projects/${projectID}`)
                const response = await axios.get(url)
                this.project = response.data.project;

                // check if current logged in user is owner of requested project
                if (this.project !== null && this.$store.state.auth.user.id === this.project.creator_id){
                    this.isOwner = true;
                }

                this.notFound = false;
            } catch (err) {
                console.log(`Error while requesting project ${projectID}: ${err.response.data}`)
                this.notFound = true;
            }
        });
    }
}