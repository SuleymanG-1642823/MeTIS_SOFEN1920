import {shallowMount} from "@vue/test-utils";
import ProjectsOfUser from "@/components/ProjectsOfUser/ProjectsOfUser";

var wrapper;
var userid_prop;

describe('ProjectsOfUser component', () => {
    beforeAll(()=> {
        userid_prop = 1;
        wrapper = shallowMount(ProjectsOfUser, {
            propsData: {userid_prop}
        })
    });
    test('Initializing data', (done) => {
        expect(wrapper.vm.userID).toBe(1);
        expect(typeof(wrapper.vm.projects_owner)).toBe('object');
        expect(typeof(wrapper.vm.projects_member)).toBe('object');
        done();
    })
})