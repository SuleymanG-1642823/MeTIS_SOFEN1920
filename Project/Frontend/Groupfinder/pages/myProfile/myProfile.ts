import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';

@Component({
    components: {}
})
export default class MyProfile extends Vue {
    user: User|null = null;

    mounted(){
        // TODO: get data from vuex store
    }
}
