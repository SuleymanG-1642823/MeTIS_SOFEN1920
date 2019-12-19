import {mount, shallowMount} from "@vue/test-utils";
import Vue from 'vue';
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types";
import profileForm from "@/components/profileForm/profileForm";

var profile;
var wrapper;

describe('ProfileForm component', () => {
    beforeAll(() => {
      profile = {
        id: 0,
        name: "Test profile",
        project_id: 1,
        skills: [],
        questions: []
      };
      wrapper = shallowMount(profileForm, {
        propsData: {profile}
      });
    });
    test('adds a skill', (done) => {
        wrapper.vm.addSkill('skill');
        expect(wrapper.vm.profile.skills[0]).toBeTruthy();
        done();
    }),
    test('remove skill', (done) => {
        wrapper.vm.deleteSkill('skill');
        expect(wrapper.vm.profile.skills).toEqual([]);
        done();
    }),
    test('remove skill from index', (done) => {
        wrapper.vm.addSkill('skill');
        wrapper.vm.deleteSkillFromIndex(0);
        expect(wrapper.vm.profile.skills).toEqual([]);
        done()
    }),
    test('test if the questionnaire is filled', (done) => {
        expect(wrapper.vm.isQuestionnaireFilled()).toEqual(false);
        wrapper.vm.profile.questions.push("Question");
        expect(wrapper.vm.isQuestionnaireFilled()).toEqual(true);
        done();
    })
})