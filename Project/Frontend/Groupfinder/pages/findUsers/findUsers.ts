import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
import api from '@/helpers/Api'
import RecommendedUsersList from '~/components/RecommendedUsersList/RecommendedUsersList'
import Project from '~/types/project'
import RecommendedUsers from '~/components/RecommendedUsers/RecommendedUsers'

@Component({
    components: {
        RecommendedUsersList,
        RecommendedUsers
    },
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.project_id)
    }
})
export default class FindUsers extends Vue {
    project: Project|null = null;

    beforeCreate(){
        return new Promise<void>(async resolve => {
            let projectID = this.$route.params.project_id;
            try {
                // Get current user ID if a user is logged in and pass that in the url
                let url = api(`projects/${projectID}`)
                const response = await axios.get(url)
                this.project = response.data.project;
            } catch (err) {
                console.log(`Error while requesting project ${projectID}: ${err.response.data}`)
            }
        });
    }
}