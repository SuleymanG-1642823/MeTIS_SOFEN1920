import { Vue, Component, Prop} from 'vue-property-decorator'
import ProjectProfileGuest from './ProjectProfileGuest'
import Profile from '~/types/profile'

@Component({
    components:{
        ProjectProfileGuest
    }
})
export default class ProjectProfilesGuest extends Vue {
    @Prop(Array) profiles: Profile[];
}