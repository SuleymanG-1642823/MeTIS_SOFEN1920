import { Vue, Component } from 'vue-property-decorator'
import RecommendedProjectsList from '../../components/RecommendedProjectsList/RecommendedProjectsList'
import axios from 'axios'
import ProjectMatch from '../../types/projectMatch';
import api from '@/helpers/Api';

@Component({
    components: {
      RecommendedProjectsList
    }
  })
  export default class RecommendedProjects extends Vue {
    recommendedProjects: Array<ProjectMatch>|null = null;
    
    async mounted () {
      try {
        // Get current user ID if a user is logged in and pass that in the url
        let url = api(`projects/matchFor/${this.$store.state.auth.user.id}`)
        const response = await axios.get(url)
        this.recommendedProjects = response.data
      } catch (err) {
        console.log('Error while fetching user data.')
      }
    }
  }