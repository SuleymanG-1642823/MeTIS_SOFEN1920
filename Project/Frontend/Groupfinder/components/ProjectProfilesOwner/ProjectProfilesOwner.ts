import { Vue, Component, Prop} from 'vue-property-decorator'
import ProjectProfileOwner from './ProjectProfileOwner'
import Profile from '~/types/profile'
@Component({
    components: {
        ProjectProfileOwner
    }
})
export default class ProjectProfilesOwner extends Vue {
    @Prop(Array) profiles: Profile[];

}