import {Vue, Component, Prop} from 'vue-property-decorator'
import Notification from '~/components/Notification/Notification'
import axios from 'axios';
import api from '@/helpers/Api';
import INotification from '../../types/notification'

@Component({
    components: {
        Notification
    }
})
export default class SidebarNotifications extends Vue{
    notifications: Array<INotification> = [];
    test: boolean|null = null;

    created(){
        this.refreshNotifications();
        this.updateNotifStatus();
    }

    /**
     * Requests all notifications from the server for the current user.
     */
    private refreshNotifications(){
        let url = api(`notifications/${this.$store.state.auth.user.id}`);
        axios.get(url)
        .then(response => {
            console.log(response.data);
            this.notifications = response.data;
        })
        .catch(error => {
            console.log("Error while getting number of new notifications");
        });
    }

    /**
     * Set all notification statuses of the current user to seen.
     */
    private updateNotifStatus(){
        let url = api(`notifications/${this.$store.state.auth.user.id}`);
        axios.put(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error while getting number of new notifications");
        });
    }
}