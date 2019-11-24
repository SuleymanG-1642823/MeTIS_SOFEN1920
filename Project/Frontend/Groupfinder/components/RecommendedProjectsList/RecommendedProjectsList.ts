import {Vue, Component, Prop} from 'vue-property-decorator'
import Project from '../../types/project'
import RecommendedProjectCard from '../RecommendedProjectCard/RecommendedProjectCard'

@Component({
    components:{
        RecommendedProjectCard
    }
})
export default class RecommendedProjectsList extends Vue{
    @Prop(Array) readonly projectMatches: Array<Project>
}