import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Questionnaire from '~/types/questionnaire';

@ Component
export default class Questionnaire_Component extends Vue {
    @Prop({default: {}}) id: Boolean
    @Prop({default: {}}) questionnaire: Questionnaire

    // Data
    // This list will contain all the questions and their id's
    // questionsList: Array<String> = [];
    inputText: string = "";

    addQuestion(){
        let value: string = this.inputText;
        // Check if the question is already asked or if the question is emty
        if (this.questionnaire.questions.indexOf(value) <= -1 && value !== "" && value){
            this.questionnaire.questions.push(value);

            this.clearInputText();
        }
    }

    deleteQuestion(index: number){
        this.questionnaire.questions.splice(index, 1);
    }

    clearInputText(){
        this.inputText = "";
    }

    modalId(){
        return 'modal' + this.id;
    }

    created(){

    }
}
