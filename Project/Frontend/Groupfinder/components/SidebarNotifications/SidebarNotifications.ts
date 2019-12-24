import {Vue, Component, Prop} from 'vue-property-decorator'
import Notification from '~/components/Notification/Notification'

@Component({
    components: {
        Notification
    }
})
export default class SidebarNotifications extends Vue{
}