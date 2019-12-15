import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Project from '../../types/project';
import Profile from '../../types/profile';
import Questionnaire from '../../types/questionnaire'
import Category from '~/types/category';
import SplitCategory from '~/types/splitcategory'
import SubCategory from '~/types/subcategory'
import CategoryComponent from '~/components/CategoriesComponent/CategoriesComponent.vue'

@ Component({
    components: {profileForm, CategoryComponent}
})
export default class ProjectEdit extends Vue {
    // Data
    categories: Array<Category> = []
    categories_input : Array<SplitCategory> = []
    index: number = 0

    // TODO: this needs to go into the Project object
    selectedCategory: string = "";

    @Prop({default: {}}) project: Project;

    async created(){
        const categories_data: Category[] = await this.getAllCategories()
        categories_data.forEach(element => {
            let new_category = <Category>{};
            new_category.id = element.id
            new_category.name = element.name
            new_category.subcategory = element.subcategory
            this.categories.push(new_category)
        });
        this.parseCategories(this.categories)
    }

    // Methods
    /**
     * Adds a profile to the profile form
     */
    addProfile(){
        this.index = this.index.valueOf() + 1
        let new_profile = <Profile>{};
        new_profile.id = this.index;
        new_profile.name = "";
        let new_questionnaire = <Questionnaire>{};
        new_questionnaire.questions = [];
        new_profile.questionnaire = new_questionnaire;
        this.project.profiles.push(new_profile);
        console.log(this.project);
        this.$forceUpdate();
    }

    /**
     * Functions makes a JSON object with the ID en name of a subcategory that's part
     * of a larger main category
     * @param subcategory The name of the subcategory that is to be stored in the JSON
     * @param id The id of the subcategory that is to be stored in the JSON
     * @return returns a JSON object that represents one subcategory of a main category
     */
    parseSubCategory(subcategory: string, id: number|null): SubCategory{
        let temp_sub_category = <SubCategory>{};
        temp_sub_category.sub_id = id;
        temp_sub_category.sub_name = subcategory;
        return temp_sub_category
    }

    parseCategories(categories_inp: Array<Category>){
        for(let i = 0; i < categories_inp.length; i++){
            let check = true
            let existing_main_index = 0
            for(let j = 0; j < this.categories_input.length; j++){
                if(categories_inp[i].name == this.categories_input[j].main_name){
                    check = false
                    existing_main_index = j
                }
            }
            if(check){
                let temp_split_category = <SplitCategory>{};
                temp_split_category.main_name = categories_inp[i].name
                temp_split_category.subcategories = []
                if(categories_inp[i].subcategory != null){
                    temp_split_category.subcategories.push(this.parseSubCategory(categories_inp[i].subcategory, categories_inp[i].id))
                }
                else{
                    temp_split_category.main_id = categories_inp[i].id
                }
                this.categories_input.push(temp_split_category)
            }
            else{
                this.categories_input[existing_main_index].subcategories.push(this.parseSubCategory(categories_inp[i].subcategory, categories_inp[i].id))
            }
        }
        console.log(this.categories_input)
    }

    /**
     * Deletes the profileform of the given profile
     * @param value The profile the user wants to delete
     */
    deleteProfileForm(value: Profile){
        let index = this.project.profiles.indexOf(value, 0);
        if(index > -1){
            this.project.profiles.splice(index, 1);
            this.$forceUpdate();
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
}
