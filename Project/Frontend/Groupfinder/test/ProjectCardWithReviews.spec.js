import {shallowMount} from "@vue/test-utils";
import ProjectCardWithReviews from '@/components/ProjectCardWithReviews/ProjectCardWithReviews';

var wrapper;
var userID_prop;
var project_prop;

describe('ProjectCardWithReviews component', () => {
    beforeAll(() => {
        userID_prop = 1;
        project_prop = {
            id: 1,
            name: 'test',
            status: 0, // 0: just created looking for members, 1: looking for members, 2: found all members, awaiting approval, 3: found all members, approved
            pitch: 'pitch',
            created_at: '2019-12-12 20:00:00', // 'YYYY-MM-DD hh:mm:ss' format
            edited_at: '2019-12-12 20:00:00', // 'YYYY-MM-DD hh:mm:ss' format
            creator_id: 1,
            creator_first_name: 'Lennert',
            creator_last_name: 'Geebelen',
            profiles: [],
            categories: []
        }
        wrapper = shallowMount(ProjectCardWithReviews, {
            propsData: {userID_prop, project_prop}
        })
    });
    test('getCreatorName() method', (done) => {
        expect(wrapper.vm.creatorName.localeCompare('Lennert Geebelen')).toBe(0);
        done();
    })
    test('ChangeButtonText()', (done) => {
        expect(wrapper.vm.buttonText.localeCompare('Show reviews')).toBe(0);
        wrapper.vm.changeButtonText();
        expect(wrapper.vm.buttonText.localeCompare('Hide reviews')).toBe(0);
        wrapper.vm.changeButtonText();
        expect(wrapper.vm.buttonText.localeCompare('Show reviews')).toBe(0);
        done();
    })
    test('createFullName(first_name, last_name)', (done) => {
        var fullName = wrapper.vm.createFullName('one','two');
        expect(fullName.localeCompare('From: one two')).toBe(0);
        done();
    })
})