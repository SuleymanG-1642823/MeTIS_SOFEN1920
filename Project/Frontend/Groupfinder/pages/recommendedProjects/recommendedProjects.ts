import { Vue, Component } from 'vue-property-decorator'
import RecommendedProjectsList from '../../components/RecommendedProjectsList/RecommendedProjectsList'
import axios from 'axios'
import ProjectMatch from '../../types/projectMatch';

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
        const response = await this.$axios.get(`http://localhost:4000/projects/matchFor/${this.$store.state.user.id}`);
        this.recommendedProjects = response.data;
      } catch (err) {
        console.log('Error while fetching user data.')
      }
    }
  }