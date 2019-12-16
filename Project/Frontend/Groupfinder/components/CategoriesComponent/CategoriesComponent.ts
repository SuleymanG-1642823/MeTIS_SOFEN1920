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
    subcategories : Array<string> = []
    selectedCategoriesCheckboxes: Boolean[] = []
    allCheckbox: Boolean = false
    categoryName: string = ""
    disabledDropdown: string = "dontShow"

    @Prop({default: {}}) category: SplitCategory;

    async created(){
        this.category.subcategories.forEach(element => {
            this.subcategories.push(element.sub_name);
            this.selectedCategoriesCheckboxes.push(false);
        })
        if(this.category.subcategories.length !== 0){
            this.disabledDropdown = "show"
        }
        this.categoryName = this.category.main_name
        console.log(this.category)
    }

    @Watch('allCheckbox')
    onAllCheckboxChange(value: boolean, oldValue: boolean){
        for(let i = 0; i < this.selectedCategoriesCheckboxes.length; i++){
            this.selectedCategoriesCheckboxes[i] = this.allCheckbox
        }
        if(this.category.main_id != null && this.allCheckbox === true){
            let temp_categories: Array<number|null> = []
            temp_categories.push(this.category.main_id)
            this.$emit("updateCategories", temp_categories)
        }
    }

    @Watch('selectedCategoriesCheckboxes')
    onSelectedCatCheckChange(){
        let temp_categories: Array<number|null> = []
        if(this.category.main_id != null && this.allCheckbox === true){
            temp_categories.push(this.category.main_id)
        }
        else{
            for(let i = 0; i < this.selectedCategoriesCheckboxes.length; i++){
                if(this.selectedCategoriesCheckboxes[i] === true){
                    temp_categories.push(this.category.subcategories[i].sub_id)
                }
            }
        }
        if(!(this.checkIfNothingChecked())){
            this.$emit("updateCategories", temp_categories)
        }
    }

    checkIfNothingChecked(): boolean {
        if(this.allCheckbox !== true){
            let check = true
            this.selectedCategoriesCheckboxes.forEach(element => {
                console.log("out")
                if(element.valueOf() === true){
                    console.log("in")
                    check = false
                }
            });
            return check
        }
        return false
    }

    async getAllCategories(): Promise<Category[]>{
        return new Promise(
            async (resolve: any, reject: any) => {
                try {
                    let url = "http://localhost:4000/categories/";
                    const response = await axios.get(url);
                    const categories: Category[] = response.data;
                    resolve(categories)
                } catch (err){
                    console.log('Error while posting project.')
                    reject(err)
                }
            }
        )
        
    }

    toggle(index: number){
        console.log(this.selectedCategoriesCheckboxes)
    }
}
