import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'
import api from '@/helpers/Api'

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
    selected_categories: Array<Category> = []
    categories_input : Array<SplitCategory> = []
    selected_categories_ids: Array<number> = []
    index: number = 0

    // Stores all previously created questionnaires from this user
    userQuestionnaireList: Questionnaire[] = [];

    @Prop({default: {}}) project: Project;

    created(){
        this.createCategories();
        this.getQuestionnaires(this.$store.state.auth.user.id);
    }

    // Methods
    /**
     * Gets all the categories from the database and puts them
     * in the categories array
     */
    async createCategories(){
        const categories_data: Category[] = await this.getAllCategories()
        categories_data.forEach(element => {
            let new_category = <Category>{};
            new_category.id = element.id
            new_category.name = element.name
            new_category.subcategory = element.subcategory
            this.categories.push(new_category)
        });
        this.parseCategories(this.categories);
    }
    /**
     * Adds a profile to the profile form
     */
    addProfile(){
        // Create temp project
        console.log(this.project);
        let local_project = this.project;
        this.index = this.index.valueOf() + 1
        let new_profile = <Profile>{};
        new_profile.id = this.index;
        new_profile.name = "";
        new_profile.questions = [];
        new_profile.skills = [];
        local_project.profiles.push(new_profile);
        // Emit new project
        this.$emit("update_project", local_project);
    }

    update_profile(new_profile: Profile){
        let local_project = this.project;
        local_project.profiles[new_profile.id] = new_profile;
        // Emit new project
        this.$emit("update_project", local_project);
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
        return temp_sub_category;
    }

    /**
     * parses the given categories array to an array containing the SplitCategory 
     * type
     * @param categories_inp an array containing categories chosen categories
     */
    parseCategories(categories_inp: Array<Category>){
        for(let i = 0; i < categories_inp.length; i++){
            let check = true;
            let existing_main_index = 0;
            for(let j = 0; j < this.categories_input.length; j++){
                if(categories_inp[i].name == this.categories_input[j].main_name){
                    check = false;
                    existing_main_index = j;
                }
            }
            if(check){
                let temp_split_category = <SplitCategory>{};
                temp_split_category.main_name = categories_inp[i].name;
                temp_split_category.subcategories = [];
                if(categories_inp[i].subcategory != null){
                    temp_split_category.subcategories.push(this.parseSubCategory(categories_inp[i].subcategory, categories_inp[i].id));
                }
                else{
                    temp_split_category.main_id = categories_inp[i].id;
                }
                this.categories_input.push(temp_split_category);
            }
            else{
                this.categories_input[existing_main_index].subcategories.push(this.parseSubCategory(categories_inp[i].subcategory, categories_inp[i].id));
            }
        }
    }

    /**
     * finds the index of the given category that needs to be removed
     * @param id contains the id of the category that needs to be removed
     */
    findIndexToRemove(id: number): number {
        for(let i = 0; i < this.selected_categories_ids.length; i++){
            if(this.selected_categories_ids[i] === id){
                return i;
            }
        }
        return this.selected_categories_ids.length + 1;
    }

    /**
     * deletes a category from the array
     * @param id the id of the category that needs to be deleted
     */
    deleteCategoryToSelection(id: number){
        for(let i = 0; i < this.selected_categories.length; i++){
            if(this.selected_categories[i].id === id){
                this.selected_categories.splice(i, 1)
            }
        }
    }

    /**
     * builds up the array with the chosen categories
     * @param id id of the category that needs to be added to the selection array
     */
    addCategoryToSelection(id: number){
        for(let i = 0; i < this.categories.length; i++){
            if(this.categories[i].id === id){
                this.selected_categories.push(this.categories[i])
            }
        }
    }

    /**
     * updates the categories arrays based on which checkboxes are checked
     * @param selected_categories array containing all the ids of the categories and
     * if they are checked or not in boolean form
     */
    updateCategories(selected_categories: Array<[number, boolean]>){
        selected_categories.forEach(element => {
            if(this.selected_categories_ids.includes(element[0].valueOf())){
                if(element[1] === false){
                    let index = this.findIndexToRemove(element[0]);
                    this.selected_categories_ids.splice(index, 1);
                    this.deleteCategoryToSelection(element[0])
                }
            }
            else{
                if(element[1] === true){
                    this.selected_categories_ids.push(element[0]);
                    this.addCategoryToSelection(element[0])
                }
            }
        });
        this.project.categories = this.selected_categories
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

    /**
     * Gets all questionnaires from one user from the backend
     * @param user_id the id of the user
     */
    async getQuestionnaires(user_id: number){
        let url = api(`questionnaires/${user_id}`);
        axios.get(url)
        .then(response => {
            console.log("GET QUESTIONNAIRES");
            console.log(response.data);
            this.userQuestionnaireList = response.data;
            console.log(this.userQuestionnaireList);
            this.$forceUpdate();
        })
        .catch(error => {
            console.log("Error while getting the questionnaires");
        })
    }

    /**
     * Returns all the categories stored in the category table in the database
     * @return returns an array containing all the categories as Category types
     */
    async getAllCategories(): Promise<Category[]>{
        return new Promise(
            async (resolve: any, reject: any) => {
                try {
                    let url = this.$api("categories")
                    const response = await axios.get(url);
                    const categories: Category[] = response.data;
                    resolve(categories);
                } catch (err){
                    console.log('Error while posting project.');
                    reject(err);
                }
            }
        )
        
    }
}
