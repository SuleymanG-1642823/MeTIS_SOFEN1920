import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';

@ Component
export default class NameCard extends Vue {
    // Props
    @Prop({type: Number, required: true}) readonly user_id: number;

    // Data
    user: User | null = null; // If user is null, the card won't be rendered because of the v-if option in <b-card> (see template)

    // Methods
    async mounted() {
        try{
            const response = await this.$axios.get(`http://localhost:4000/users/${this.user_id}`);
            this.user = response.data;
        } catch (err) {
            console.log('Error while fetching user data.');
        }
    }
}
