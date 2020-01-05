import {mount, shallowMount} from "@vue/test-utils"
import Vue from 'vue';
import { tsExternalModuleReference, exportAllDeclaration } from "@babel/types"
import CategoriesComponent from "~/components/CategoriesComponent/CategoriesComponent"

function mountComponentWithProps(Component, propsData){
    const Constructor = Vue.extend(Component);
    const vm = new Constructor({
        propsData
    }).$mount();

    return vm.$el;
}

describe('Category Component', () => {
    test('changes checkbox from state', (done) => {
        const category = {main_id: null, main_name: "web", subcategories: [{sub_id: 1, sub_name: "chrome"}]};
        const wrapper = shallowMount(CategoriesComponent, {
            propsData: {category}
        });
        console.log("Subcategory array: ", wrapper.vm.category.subcategories);
        wrapper.vm.allCheckbox = false;
        wrapper.vm.checkBoxSwitch();
        expect(wrapper.vm.allCheckbox).toEqual(true);
        done();
    }),
    test('checks if nothing is checked', (done) => {
        const category = {main_id: null, main_name: "web", subcategories: [{sub_id: 1, sub_name: "chrome"}]};
        const wrapper = shallowMount(CategoriesComponent, {
            propsData: {category}
        });
        expect(wrapper.vm.checkIfNothingChecked()).toEqual(true);
        done();
    }),
    test('updates the changes in the checkboxes', (done) => {
        const category = {main_id: null, main_name: "web", subcategories: [{sub_id: 1, sub_name: "chrome"}]};
        const wrapper = shallowMount(CategoriesComponent, {
            propsData: {category}
        });
        wrapper.vm.onAllCheckboxChange();
        expect(wrapper.emitted("updateCategories")).toBeTruthy();
        done();
    }),
    test('updates the changes in the subcategory checkboxes', (done) => {
        const category = {main_id: null, main_name: "web", subcategories: [{sub_id: 1, sub_name: "chrome"}]};
        const wrapper = shallowMount(CategoriesComponent, {
            propsData: {category}
        });
        wrapper.vm.onSelectedCatCheckChange();
        expect(wrapper.emitted("updateCategories")).toBeTruthy();
        done();
    })
})
