import {Vue, Component, Prop} from 'vue-property-decorator'
import axios from 'axios';
import api from '@/helpers/Api';

@Component
export default class NewNotificationsBadge extends Vue{
    numbOfNewNotif: number|string = 9;
    foo: string = 'test'

    beforeCreate(){
        let url = api(`notifications/numOfNewNotifications/${this.$store.state.auth.user.id}`);
        axios.get(url)
        .then(response => {
            //console.log(response.data);
            this.numbOfNewNotif= response.data;
            if (this.numbOfNewNotif === 0){
                this.numbOfNewNotif = '';
            }
        })
        .catch(error => {
            console.log("Error while getting number of new notifications");
        });
    }
}