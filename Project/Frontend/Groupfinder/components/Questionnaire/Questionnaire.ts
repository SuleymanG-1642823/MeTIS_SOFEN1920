import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Questionnaire from '~/types/questionnaire';

@ Component
export default class Questionnaire_Component extends Vue {
    @Prop({default: {}}) id: Boolean;
    @Prop({default: {}}) questions: string[];
    @Prop({default: {}}) userQuestionnaireList: Questionnaire[];

    // Keep a local version of the questionnaire until the modal closes, then emit changes to parent
    local_questions = this.questions;

    // Data
    // This list will contain all the questions and their id's
    // questionsList: Array<String> = [];
    inputText: string = "";

    /**
     * Import the questions of another questionnaire
     * @param questionnaire_index the index of the questionnaire in userQuestionnaireList that has to be imported
     */
    importQuestions(questionnaire_index: number){
        this.local_questions = this.questions.concat(this.userQuestionnaireList[questionnaire_index].questions);
    }

    addQuestion(){
        let value: string = this.inputText;
        // Check if the question is already asked or if the question is emty
        if (this.local_questions.indexOf(value) <= -1 && value !== "" && value){
            this.local_questions.push(value);

            this.clearInputText();
        }
    }

    deleteQuestion(index: number){
        this.local_questions.splice(index, 1);
    }

    clearInputText(){
        this.inputText = "";
    }

    modalId(){
        return 'modal' + this.id;
    }

    /**
     * When the modal closes we will emit the changes to the questionnaire to the parent component
     */
    onModalClose(){
        // Emit the update
        this.$emit("update_questionnaire", this.local_questions);
    }

    created(){
    }
}
