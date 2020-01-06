import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios from 'axios';
import api from '@/helpers/Api';

interface Category{
    id: number,
    name: string,
    subcategory: string|null
}

interface Category_Preference {
    id: number,
    name: string,
    subcategory: string|null,
    preference: boolean|null
}

interface Category_Dict_Element {
    name: string,
    categories: Category_Preference[]
}

@Component({
    components: {

    }
})
export default class EditPreferences extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userID_prop: number;

    // DATA
    private dictionary_categories: Category_Dict_Element[] = [];
    private categories: Category_Preference[] = [];
    
    // LIFECYCLE HOOKS
    /**
     * This method will be called when this component is mounted.
     */
    private async mounted(){
        const category_ids_inserted: number[] = [];
        let response = await this.$axios.get(api(`preferences/${this.userID_prop}/true`));
        const categories_preferred: Category[] = response.data;
        response = await this.$axios.get(api(`preferences/${this.userID_prop}/false`));
        const categories_not_preferred: Category[] = response.data;
        response = await this.$axios.get(api('categories'));
        const all_categories: Category[] = response.data;
        for (let i = 0; i < categories_preferred.length; i++){
            category_ids_inserted.push(categories_preferred[i].id);
            this.categories.push(
                {
                    id: categories_preferred[i].id,
                    name: categories_preferred[i].name,
                    subcategory: categories_preferred[i].subcategory,
                    preference: true
                }
            );
        }
        for (let i = 0; i < categories_not_preferred.length; i++){
            category_ids_inserted.push(categories_not_preferred[i].id);
            this.categories.push(
                {
                    id: categories_not_preferred[i].id,
                    name: categories_not_preferred[i].name,
                    subcategory: categories_not_preferred[i].subcategory,
                    preference: false
                }
            );
        }
        for (let i = 0; i < all_categories.length; i++){
            if (! category_ids_inserted.includes(all_categories[i].id)){
                category_ids_inserted.push(all_categories[i].id);
                this.categories.push({
                    id: all_categories[i].id,
                    name: all_categories[i].name,
                    subcategory: all_categories[i].subcategory,
                    preference: null
                });
            }
        }

        for (let i = 0; i < this.categories.length; i++){
            let category_name: string = this.categories[i].name;
            let index: number = this.indexOfNameInDict(category_name);
            if (index == -1) {
                this.dictionary_categories.push({
                    name: category_name,
                    categories: []
                })
                index = this.indexOfNameInDict(category_name);
            }
            this.dictionary_categories[index].categories.push(this.categories[i]);
        }
    }

    /**
     * Get the index of a main category from the dictionary.
     * @param category_name 
     */
    private indexOfNameInDict(category_name: string): number {
        for (let i = 0; i < this.dictionary_categories.length; i++){
            if (this.dictionary_categories[i].name.localeCompare(category_name) == 0){
                return i;
            }
        }
        return -1;
    }

    /**
     * Get a subcategory from the dictionary.
     * @param main_category_name the name of the main category containing the subcategory.
     * @param categoryID the id of the subcategory.
     */
    private getCategory(main_category_name: string, categoryID: number): null|Category_Preference{
        let index: number = this.indexOfNameInDict(main_category_name);
        let subcategories: Category_Preference[] = this.dictionary_categories[index].categories;
        for (let i = 0; i < subcategories.length; i++){
            if (subcategories[i].id == categoryID){
                return subcategories[i];
            }
        }
        return null;
    }

    /**
     * Edit a user's category preference.
     * @param main_category_name name of the main category containing the subcategory that will be changed.
     * @param categoryID the id of the subcategory.
     * @param type the new type of the preference.
     */
    private editPreference(main_category_name: string, categoryID: number, type: boolean|null){
        console.log("EDIT PREFERENCE FOR CATEGORY " + main_category_name + " WITH ID " + categoryID + " type=" + type);
        let oldCategory: Category_Preference|null = this.getCategory(main_category_name, categoryID);
        if (type === null){
            this.deletePreference(categoryID);
        }
        else if (oldCategory && (oldCategory.preference === null)){ // if user had no preference for this category before
             this.addNewPreference(categoryID, type);
        } 
        else { // user had a preference (positive or negative) for this category before
            this.updatePreference(categoryID, type);
        }

        let index: number = this.indexOfNameInDict(main_category_name);
        for (let i = 0; i < this.dictionary_categories[index].categories.length; i++){
            if (this.dictionary_categories[index].categories[i].id == categoryID){
                this.dictionary_categories[index].categories[i].preference = type;
                break;
            }
        }
    }

    /**
     * Add a new preference into the database.
     * @param categoryID id of the category.
     * @param type type of the preference.
     */
    private async addNewPreference(categoryID: number, type: boolean){
        const url: string = api(`preferences/${this.userID_prop}/${categoryID}/${type}`);
        try {
            await this.$axios.post(url);
        } catch (err){
            console.log(err);
        }
    }

    /**
     * Delete an existing preference from the database.
     * @param categoryID id of the category.
     */
    private async deletePreference(categoryID: number){
        const url: string = api(`preferences/${this.userID_prop}/${categoryID}`);
        try {
            await this.$axios.delete(url);
        } catch (err){
            console.log(err);
        }
    }

    /**
     * Update an existing preference into the database.
     * @param categoryID id id of the category.
     * @param type type of preference.
     */
    private async updatePreference(categoryID: number, type: boolean){
        const url: string = api(`preferences/${this.userID_prop}/${categoryID}/${type}`);
        try{
            await this.$axios.put(url);
        } catch (err) {
            console.log(err);
        }
    }

    // COMPUTED
    /**
     * Get all categories that don't have subcategories.
     */
    get categoriesWithoutSubcategories(){
        let categories: Category_Dict_Element[] = [];
        for (let i = 0; i < this.dictionary_categories.length; i++){
            if (! this.dictionary_categories[i].categories[0].subcategory){
                categories.push(this.dictionary_categories[i])
            }
        }
        return categories;
    }

    /**
     * Get all subcategories.
     */
    get categoriesWithSubcategories(){
        let categories = [];
        for (let i = 0; i < this.dictionary_categories.length; i++){
            if (this.dictionary_categories[i].categories[0].subcategory){
                //categories.push(this.dictionary_categories[i])
                for (let j = 0; j < this.dictionary_categories[i].categories.length; j++){
                    categories.push({
                        main_category_name: this.dictionary_categories[i].name,
                        id: this.dictionary_categories[i].categories[j].id,
                        subcategory: this.dictionary_categories[i].categories[j].subcategory,
                        preference: this.dictionary_categories[i].categories[j].preference
                    })
                }
            }
        }
        return categories;
    }
}
