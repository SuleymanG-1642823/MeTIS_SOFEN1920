import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Category from '~/types/category';
import { statement } from '@babel/template';
import SplitCategory from '~/types/splitcategory';
import SubCategory from '~/types/subcategory';

@ Component({
    components: {profileForm}
})
export default class CategoriesComponent extends Vue {
    // Data
    subcategories : Array<string|null> = []
    selectedCategoriesCheckboxes: Boolean[] = []
    allCheckbox: Boolean = false
    categoryName: string = ""
    disabledDropdown: string = "dontShow"

    @Prop({default: {}}) category: SplitCategory;

    /**
     * Function gets called when the component gets created,
     * makes a checkbox for each existing category and its subcategories
     */
    created(){
        if(this.category.main_id !== null){
            if(this.category.checkedBool){
                this.allCheckbox = true;
            }
        }
        for(let i = 0; i < this.category.subcategories.length; i++){
            this.subcategories.push(this.category.subcategories[i].sub_name)
            if(this.category.subcategories[i].checkedBool){
                this.selectedCategoriesCheckboxes[i] = true;
            }
            else{
                this.selectedCategoriesCheckboxes[i] = false;
            }
        }
        if(this.category.subcategories.length !== 0){
            this.disabledDropdown = "show"
        }
        this.categoryName = this.category.main_name
    }

    /**
     * Watchers over the allCheckbox v-model, when this model changes
     * the functions gets called.
     * Checks all subcategories if allCheckbox checkend, otherwise unchecks them
     */
    @Watch('allCheckbox')
    onAllCheckboxChange(){
        for(let i = 0; i < this.selectedCategoriesCheckboxes.length; i++){
            this.selectedCategoriesCheckboxes[i] = this.allCheckbox
        }
        if(this.category.main_id != null){
            let temp_categories: Array<[number|null, boolean]> = []
            temp_categories.push([this.category.main_id, this.allCheckbox.valueOf()])
            this.$emit("updateCategories", temp_categories)
        }
    }

    /**
     * Watches over the selectedCategoriesCheckboxes v-model if one of the element
     * in the array changes. Updates the project if so.
     */
    @Watch('selectedCategoriesCheckboxes')
    onSelectedCatCheckChange(){
        let temp_categories: Array<[number|null, boolean]> = []
        if(this.category.main_id != null){
            temp_categories.push([this.category.main_id, this.allCheckbox.valueOf()])
        }
        else{
            for(let i = 0; i < this.selectedCategoriesCheckboxes.length; i++){
                temp_categories.push([this.category.subcategories[i].sub_id, this.selectedCategoriesCheckboxes[i].valueOf()])
            }
        }
        this.$emit("updateCategories", temp_categories);
    }

    /**
     * Checks the checkbox if not checked and vice versa.
     */
    checkBoxSwitch(): void{
        this.allCheckbox = !this.allCheckbox;
    }

    /**
     * Checks if none of the checkboxes are checked
     * @return returns true if none are checked else returns fealse
     */
    checkIfNothingChecked(): boolean {
        if(this.category.subcategories.length === 0){
            if(this.allCheckbox === false){
                return true
            }
            else{
                return false
            }
        }
        else{
            let check = true
            this.selectedCategoriesCheckboxes.forEach(element => {
                if(element.valueOf() === true){
                    check = false
                }
            });
            return check
        }
    }
}
