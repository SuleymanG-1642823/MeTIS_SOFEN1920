import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Skill from '../../types/skill';
import axios from 'axios';

@Component
export default class SkillsOfUser extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA
    skills: Skill[] = [];

    // LIFECYCLE HOOKS
    async mounted(){
        try{
            const response = await axios.get(`http://localhost:4000/users_skills/${this.userid_prop}`);
            this.skills = response.data;
        } catch (err) {
            console.log(err);
        }
    }
}
