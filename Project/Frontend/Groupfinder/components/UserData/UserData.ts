import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '../../types/user';
import axios from 'axios';

@ Component
export default class UserData extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly user_id: number;

    // DATA
    user: User|null = null; 

    // LIFECYCLE HOOKS
    async mounted(){
        try{
            const response = await axios.get(`http://localhost:4000/users/${this.user_id}`);
            this.user = response.data.user;
        } catch (err) {
            console.log(err);
        }
    }

    // COMPUTED

    // METHODS

}