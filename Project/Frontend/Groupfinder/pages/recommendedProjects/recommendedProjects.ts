import { Vue, Component } from 'vue-property-decorator'
import RecommendedProjectsList from '../../components/RecommendedProjectsList/RecommendedProjectsList'
import axios from 'axios'
import ProjectMatch from '../../types/projectMatch';
import Project from '../../types/project';
import api from '@/helpers/Api';

@Component({
  components: {
    RecommendedProjectsList
  }
})
export default class RecommendedProjects extends Vue {
  recommendedProjects: Array<ProjectMatch> | null = null;
  num: number = 0;
  searchInput: string = '';
  searchResults: Project[] = [];
  showSearchFeedback: boolean = false;

  async mounted() {
    try {
      // Get current user ID if a user is logged in and pass that in the url
      let url = api(`projects/matchFor/${this.$store.state.auth.user.id}`)
      const response = await this.$axios.get(url)
      this.recommendedProjects = response.data
    } catch (err) {
      console.log('Error while fetching user data.')
    }
  }

  async search(){
    if (this.searchInput.length > 0){
      try {
        // Get current user ID if a user is logged in and pass that in the url
        let url = api(`projects/search/${this.searchInput}`)
        
        // returns Array<ProfileUserMatch>
        const response = await this.$axios.get(url)
        this.searchResults = response.data

        // show feedback if there are no results
        if (this.searchResults.length === 0){
          this.showSearchFeedback = true;
        }
      } catch (err) {
        console.log('Error while fetching user data.')
      }
    }
  }
}