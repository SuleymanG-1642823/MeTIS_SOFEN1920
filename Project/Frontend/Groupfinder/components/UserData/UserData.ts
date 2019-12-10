import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';

@ Component
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    privateData: boolean = false;
    user: User|null = null;

    // LIFECYCLE HOOKS
    mounted(){
        this.user = this.user_prop;
    }
}