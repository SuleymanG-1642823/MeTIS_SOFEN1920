import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@ Component
export default class Questionnaire extends Vue {
    @Prop({default: {}}) id: Boolean

    // Data
    // This list will contain all the questions and their id's
    questionsList: Array<String> = [];
    inputText: String = "";

    addQuestion(){
        let value: String = this.inputText;
        // Check if the question is already asked or if the question is emty
        if (this.questionsList.indexOf(value) <= -1 && value !== "" && value){
            this.questionsList.push(value);

            this.clearInputText();
        }
    }

    deleteQuestion(index: number){
        this.questionsList.splice(index, 1);
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
