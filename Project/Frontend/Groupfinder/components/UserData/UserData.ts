import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';

@Component({
    components: {
    }
})
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    private privateData: boolean = false;
    private user: User|null = null;

    // LIFECYCLE HOOKS
    private mounted(){
        this.user = this.user_prop;
    }
}