import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import Profile from '~/types/profile';
import Skill from '~/types/skill';
import Questionnaire from '~/types/questionnaire';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

import Questionnaire_Component from '~/components/Questionnaire/Questionnaire.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestionCircle)
library.add(faTrashAlt)

@ Component ({
    components: {VueSlider, 'font-awesome-icon': FontAwesomeIcon, 'Questionnaire':Questionnaire_Component}
})
export default class profileForm extends Vue {
    // All the skills for this profile get stored in this list
    skillList: Array<String> = [];
    skill_input: String = ""

    // boolean indicates if questionnaire modal needs to be visible
    showQuestionnaire: Boolean = false;

    @Prop({default: {}}) profile: Profile

    // Methods

    // Show the questionnaire
    changeQuestionnaireVisible(value: Boolean){
        this.showQuestionnaire = value;
    }

    showQuestionnaireModal(){
        this.$root.$emit('bv::show::modal', 'my-modal');
    }

    // Add skill to list
    addSkill(skill: string){
        // Check if skill not empty string
        if (skill !== "" && skill){
            // Check if skill not already in list
            let skillFound: boolean = false;
            for (let item of this.profile.skills) {
                if (item.name === skill){
                    skillFound = true;
                    break;
                }
            }
            if (!skillFound){
                let skillObject = <Skill>{};
                skillObject.name = skill;
                this.profile.skills.push(skillObject);
                this.$forceUpdate();
            }
        }
    }

    // Remove skill from list
    deleteSkill(skill: string){
        // Find index
        let index: number = 0;
        let indexFound: boolean = false;
        for (let item of this.profile.skills) {
            if (item.name === skill){
                indexFound = true;
                break;
            }
            index = index + 1;
        }

        // Remove skill
        if (indexFound){
            this.profile.skills.splice(index, 1);
        }
    }

    // Remove skill from list by index
    deleteSkillFromIndex(index: number){
        this.profile.skills.splice(index, 1);
        this.$forceUpdate();
    }

    // Remove profile from list
    deleteProfileFromList(){
        this.$emit('deleteProfile', this.$props.profile)
    }

    // Returns the skill at the given index
    indexToSkill(index: number): String{
        return this.profile.skills[index].name;
    }

    mounted(){
        this.profile.skills = new Array();
    }

    modalId(){
        return 'modal' + this.profile.id;
    }
}