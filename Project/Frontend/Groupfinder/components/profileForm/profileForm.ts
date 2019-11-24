import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';

@ Component
export default class profileForm extends Vue {
    // All the skills for this profile get stored in this list
    skillList: Array<String> = [];

    data(){
        return{

        }
    }

    // Methods

    // Add skill to list
    addSkill(skill: String){
        // Check if skill not empty string
        if (skill !== "" && skill){
            // Check if skill not already in list
            let skillFound: boolean = false;
            for (let item of this.skillList) {
                if (item === skill){
                    skillFound = true;
                    break;
                }
            }
            if (!skillFound){
                this.skillList.push(skill);
            }
        }
    }

    // Remove skill from list
    deleteSkill(skill: String){
        // Find index
        let index: number = 0;
        let indexFound: boolean = false;
        for (let item of this.skillList) {
            if (item === skill){
                indexFound = true;
                break;
            }
            index = index + 1;
        }

        // Remove skill
        if (indexFound){
            this.skillList.splice(index, 1);
        }
    }
}
