import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import UserData from '../../components/UserData/UserData';

@Component({
    components: {
        UserData
    }
})
export default class UserPage extends Vue {
}
