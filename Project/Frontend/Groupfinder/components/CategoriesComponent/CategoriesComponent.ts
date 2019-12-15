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
        /**const categories_data: Category[] = await this.getAllCategories()
        categories_data.forEach(element => {
            this.categories_input.push(element.name)
            this.selectedCategoriesCheckboxes.push(false)
        });*/
        this.category.subcategories.forEach(element => {
            this.subcategories.push(element.sub_name);
            this.selectedCategoriesCheckboxes.push(false);
        })
        if(this.category.subcategories.length !== 0){
            this.disabledDropdown = true
        }
        this.categoryName = this.category.main_name
        console.log(this.category)
    }

    @Watch('allCheckbox')
    onAllCheckboxChange(value: boolean, oldValue: boolean){
        for(let i = 0; i < this.selectedCategoriesCheckboxes.length; i++){
            this.selectedCategoriesCheckboxes[i] = this.allCheckbox
        }
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
