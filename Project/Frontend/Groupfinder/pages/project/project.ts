import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import Project from '../../types/project'
import api from '@/helpers/Api';
import ProjectInformation from '~/components/ProjectInformation/ProjectInformation'
import Category from '~/types/category'

@Component({
    components: {
        ProjectInformation
    },
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    }
})
export default class RecommendedProjects extends Vue {
    project: Project|null = null;
    notFound: boolean = false;
    isOwner: boolean = false;

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

                // test only
                let category1: Category = {
                    id: null,
                    name: 'Website',
                    subcategory: ''
                }
            
                if (this.project !== null){
                    this.project.categories.push(category1);
                }
            } catch (err) {
                console.log(`Error while requesting project ${projectID}: ${err.response.data}`)
                this.notFound = true;
            }
        });
    }
}