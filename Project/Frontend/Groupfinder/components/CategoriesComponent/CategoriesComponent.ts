import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Category from '~/types/category';
import { statement } from '@babel/template';

@ Component({
    components: {profileForm}
})
export default class CategoriesComponent extends Vue {
    // Data
    categories: Array<Category> = []
    categories_input : Array<String> = []
    selectedCategories: String[] = []
    selectedCategoriesCheckboxes: Boolean[] = []
    allCheckbox: Boolean = false

    async created(){
        const categories_data: Category[] = await this.getAllCategories()
        categories_data.forEach(element => {
            this.categories_input.push(element.name)
            this.selectedCategoriesCheckboxes.push(false)
        });
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

    testValue(){
        console.log(this.selectedCategories)
    }

    toggle(index: number){
        console.log(this.selectedCategoriesCheckboxes)
    }
}
