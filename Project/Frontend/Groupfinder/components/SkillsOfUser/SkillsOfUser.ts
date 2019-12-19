import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Skill from '../../types/skill';
import axios from 'axios';
import api from '@/helpers/Api';

@Component
export default class SkillsOfUser extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA
    skills: Skill[] = [];

    // LIFECYCLE HOOKS
    async mounted(){
        try{
            const url = api(`users_skills/${this.userid_prop}`);
            const response = await axios.get(url);
            this.skills = response.data;
        } catch (err) {
            console.log(err);
        }
    }
}
