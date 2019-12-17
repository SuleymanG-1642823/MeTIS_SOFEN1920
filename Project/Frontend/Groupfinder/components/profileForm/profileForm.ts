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
    // skillList: Array<String> = [];
    skill_input: String = ""

    // boolean indicates if questionnaire modal needs to be visible
    showQuestionnaire: Boolean = false;

    @Prop({default: {}}) profile: Profile
    @Prop({default: {}}) userQuestionnaireList: Questionnaire[];

    // Methods

    // Show the questionnaire
    changeQuestionnaireVisible(value: Boolean){
        this.showQuestionnaire = value;
    }

    showQuestionnaireModal(){
        this.$root.$emit('bv::show::modal', 'my-modal');
    }

    /**
     * When a child component edits the questions prop it needs to be updated using this method
     * @param questions the new questions
     */
    update_questionnaire(new_questions: string[]){
        let local_profile = this.profile;
        local_profile.questions = new_questions;
        // Emit the update
        this.$emit("update_profile", local_profile);

    }

    // Add skill to list
    addSkill(skill: string){
        console.log(this.profile.skills);
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
                // Create local version of profile
                let local_profile = this.profile;
                let skillObject = <Skill>{};
                skillObject.name = skill;
                local_profile.skills.push(skillObject);
                // Emit the update
                this.$emit("update_profile", local_profile);
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
            let local_profile = this.profile;
            local_profile.skills.splice(index, 1);
            // Emit the update
            this.$emit("update_profile", local_profile);
        }
    }

    // Remove skill from list by index
    deleteSkillFromIndex(index: number){
        let local_profile = this.profile;
        local_profile.skills.splice(index, 1);
        // Emit the update
        this.$emit("update_profile", local_profile);
    }

    // Remove profile from list
    deleteProfileFromList(){
        this.$emit('deleteProfile', this.$props.profile);
    }

    // Returns the skill at the given index
    indexToSkill(index: number): String{
        return this.profile.skills[index].name;
    }

    mounted(){
    }

    modalId(){
        return 'modal' + this.profile.id;
    }

    /**
     * Checks if the questionnaire of this profile is filled
     * @retruns false if it is empty, true if it has atleast 1 question
     */
    isQuestionnaireFilled(){
        if (this.profile.questions === null){
            console.log("Questions is undefined");
            return false;
        } else if (this.profile.questions.length == 0){
            return false;
        } else {
            return true;
        }
    }
}
