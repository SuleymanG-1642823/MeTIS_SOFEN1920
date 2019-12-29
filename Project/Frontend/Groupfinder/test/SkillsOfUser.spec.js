import {shallowMount} from "@vue/test-utils";
import SkillsOfUser from '@/components/SkillsOfUser/SkillsOfUser';

var wrapper;
var userid_prop;

describe('SkillsOfUser comonent', () => {
    beforeAll(()=>{
        userid_prop = 1;
        wrapper = shallowMount(SkillsOfUser, {
            propsData: {userid_prop}
        })
    });
    test('testing format_experience(nMonths: number) method', (done) => {
        var result = wrapper.vm.format_experience(12);
        expect(result.localeCompare('1 year')).toBe(0);
        result = wrapper.vm.format_experience(1);
        expect(result.localeCompare('1 month')).toBe(0);
        result = wrapper.vm.format_experience(13);
        expect(result.localeCompare('1 year, 1 month')).toBe(0);
        done();
    })
    test('testing skillAlreadyExists(name: string) method', (done) => {
        var skill = {
            name: 'testSkill',
            experience: 12,
            weight: null
        }
        wrapper.vm.skills.push(skill);
        expect(wrapper.vm.skillAlreadyExists('testSkill')).toBe(true);
        expect(wrapper.vm.skillAlreadyExists('testskill')).toBe(true);
        expect(wrapper.vm.skillAlreadyExists('TESTSKILL')).toBe(true);
        wrapper.vm.skills = [];
        expect(wrapper.vm.skillAlreadyExists('testSkill')).toBe(false);
        done();
    })
})