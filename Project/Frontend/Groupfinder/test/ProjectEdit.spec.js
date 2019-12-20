import {mount, shallowMount} from "@vue/test-utils";
import Vue from 'vue';
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types";
import projectForm from "@/components/ProjectEdit/ProjectEdit";
import { wrap } from "module";

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
      categories: [{id: 1, name: "web", subcategory: "chrome"}]
    };
    wrapper = mount(projectForm, {
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
  }),
  test('parses a subcategory', (done) => {
    let subcategory = "chrome";
    let id = 1;
    let temp_sub_obj = {
      sub_id: 1,
      sub_name: "chrome"
    };
    expect(wrapper.vm.parseSubCategory(subcategory, id)).toEqual(temp_sub_obj);
    done();
  })
  test('parses all the categories', (done) => {
    let categories_array = [
      {
        id: 1,
        name: "web",
        subcategory: "chrome"
      }
    ];
    wrapper.vm.parseCategories(categories_array);
    expect(wrapper.vm.categories_input[0].subcategories[0].sub_name).toEqual("chrome");
    done();
  }),
  test('updates the selected categories ids', (done) => {
    let selected_categories_input = [[1, true]];
    wrapper.vm.updateCategories(selected_categories_input);
    expect(wrapper.vm.project.categories).toBe(wrapper.vm.selected_categories);
    done();
  }),
  test('finds the index to remove', (done) => {
    expect(wrapper.vm.findIndexToRemove(1)).toBe(0);
    done();
  }),
  test('deletes a category from the selection', (done) => {
    wrapper.vm.deleteCategoryToSelection(1);
    expect(wrapper.vm.selected_categories.length).toBe(0);
    done();
  }),
  test('adds a category to the selection', (done) => {
    wrapper.vm.selected_categories.push({id: 1, name: "web", subcategory: "chrome"})
    wrapper.vm.addCategoryToSelection(1);
    console.log("adding: ", wrapper.vm.selected_categories);
    expect(wrapper.vm.selected_categories[0].name).toEqual("web");
    done();
  })
})
