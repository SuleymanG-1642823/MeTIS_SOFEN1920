import {mount, shallowMount} from "@vue/test-utils";
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types";
import Questionnaire from "@/components/Questionnaire/Questionnaire";

var id;
var questions;
var userQuestionnaireList;
var wrapper;

describe('Questionnaire component', () => {
    beforeAll(() => {
        id = true;
        questions = [];
        userQuestionnaireList = [
            {
                id: null,
                name: "Questionnnaire from another profile",
                questions: ["Question from another profile"]
            }
        ];
        wrapper = mount(Questionnaire, {
            propsData: {id, questions, userQuestionnaireList}
        });
    });
    test('adds a question', (done) => {
        wrapper.vm.inputText = "Test";
        wrapper.vm.addQuestion();
        expect(wrapper.vm.questions[0]).toEqual("Test");
        console.log(wrapper.vm.questions);
        done();
    }),
    test('removes a question', (done) => {
        wrapper.vm.deleteQuestion(0);
        expect(wrapper.vm.questions).toEqual([]);
        done();
    })/*,
    test('imports a questionnaire', (done) => {
        wrapper.vm.importQuestions(0);
        wrapper.vm.onModalClose();
        expect(wrapper.vm.questions).toEqual(userQuestionnaireList[0].questions);
        done();
    })*/
})