import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';

@ Component
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Object, required: true}) readonly user_prop: User;

    // DATA
    privateData: boolean = false;
}