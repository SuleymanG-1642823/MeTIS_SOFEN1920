import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import User from '@/types/user.ts';
import axios from 'axios';
import profileForm from '~/components/profileForm/profileForm.vue'

import Project from '../../types/project';
import Profile from '../../types/profile';
import Questionnaire from '../../types/questionnaire'
import Category from '~/types/category';
import CategoryComponent from '~/components/CategoriesComponent/CategoriesComponent.vue'

@ Component({
    components: {profileForm, CategoryComponent}
})
export default class ProjectEdit extends Vue {
    // Data
    categories: Array<Category> = []
    categories_input : Array<String> = []
    index: number = 0

    // TODO: this needs to go into the Project object
    selectedCategory: string = "";

    @Prop({default: {}}) project: Project;

    async created(){
        const categories_data: Category[] = await this.getAllCategories()
        categories_data.forEach(element => {
            this.categories_input.push(element.name)
        });
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
