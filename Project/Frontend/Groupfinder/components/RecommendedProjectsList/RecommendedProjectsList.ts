import {Vue, Component, Prop} from 'vue-property-decorator'
import RecommendedProjectCard from '../RecommendedProjectCard/RecommendedProjectCard'
import ProjectMatch from '../../types/projectMatch'

@Component({
    components:{
        RecommendedProjectCard
    }
})
export default class RecommendedProjectsList extends Vue{
    @Prop(Array) readonly projectMatches: Array<ProjectMatch>
}