import {mount, shallowMount} from "@vue/test-utils";
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types";
import projectForm from "@/components/ProjectEdit/ProjectEdit";

var project;
var wrapper;

describe('ProjectEdit component', () => {
  beforeAll(() => {
    project = {
      id: null,
      name: "Test project",
      status: 0,
      created_at: "",
      edited_at: "",
      creator_id: 1,
      creator_first_name: "Firstname",
      creator_last_name: "Lastname",
      profiles: [],
      categories: []
    };
    wrapper = shallowMount(projectForm, {
      propsData: {project}
    });
  });
  test('adds a profile', (done) => {
    wrapper.vm.addProfile();
    expect(wrapper.vm.project.profiles[0]).toBeTruthy();
    done();
  }),
  test('removes a profile', (done) => {
    wrapper.vm.deleteProfileForm(wrapper.vm.project.profiles[0]);
    expect(wrapper.vm.project.profiles).toEqual([]);
    done();
  })
})
