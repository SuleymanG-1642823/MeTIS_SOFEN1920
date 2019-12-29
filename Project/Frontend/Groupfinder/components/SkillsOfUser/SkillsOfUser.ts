import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Skill from '../../types/skill';
import axios from 'axios';
import api from '@/helpers/Api';

@Component
export default class SkillsOfUser extends Vue {
    // PROPS ------------------------------------------------------------------------------------------
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA -------------------------------------------------------------------------------------------
    private fields: string[] = ["name", "experience"];
    private skills: Skill[] = [];
    private logged_in_user: boolean = false;
    private selected_skill_name: string = '';
    private edit_name: string = '';
    private edit_years: number|null = null;
    private edit_years_state: boolean|null = null;
    private edit_month_selected: number = 0;
    private edit_permitted: boolean = true;
    private new_name: string = '';
    private new_name_state: boolean|null = null;
    private years: number|null = null;
    private years_state: boolean|null = null;
    private add_permitted: boolean = false;
    private month_selected: number = 0;
    private months_options = [
        {value: 0, text: "0 months"},
        {value: 1, text: "1 month"},
        {value: 2, text: "2 months"},
        {value: 3, text: "3 months"},
        {value: 4, text: "4 months"},
        {value: 5, text: "5 months"},
        {value: 6, text: "6 months"},
        {value: 7, text: "7 months"},
        {value: 8, text: "8 months"},
        {value: 9, text: "9 months"},
        {value: 10, text: "10 months"},
        {value: 11, text: "11 months"}
    ]

    // WATCHERS ---------------------------------------------------------------------------------------
    /**
     * Adjust feedback according to the value of the new skill name.
     * This method will be called every time the value of new_name changes.
     * @param newValue new value of the skill name
     * @param oldValue old value of the skill name
     */
    @Watch('new_name')
    onNewNameChange(newValue: string, oldValue: string): void{
        if (newValue.localeCompare('') == 0){
            this.new_name_state = null;
        }
        else if (this.skillAlreadyExists(newValue)){
            this.new_name_state = false;
        }
        else {
            this.new_name_state = true;
        }
    }

    /**
     * Adjust feedback according to the value of the year.
     * @param newValue new value of years
     * @param oldvalue old value of years
     */
    @Watch('years')
    onYearChange(newValue: number|string, oldvalue: number|string): void{
        if (newValue === ''){
            this.years_state = null;
        }
        else if (newValue < 0 || newValue > 100){
            this.years_state=false;
        } 
        else{
            this.years_state=true;
        }
    }

    @Watch('years_state')
    onYearsStateChange(newValue: boolean|null, oldValue: boolean|null): void{
        if (this.new_name_state && newValue){
            this.add_permitted = true
        } else{
            this.add_permitted = false
        }
    }

    @Watch('new_name_state')
    onNewNameStateChange(newValue: boolean|null, oldValue: boolean|null): void {
        if (newValue && this.years_state){
            this.add_permitted = true;
        } else {
            this.add_permitted = false;
        }
    }

    @Watch("edit_years")
    onEditYearChange(newValue: number|string, oldvalue: number|string): void{
        if (newValue === ''){
            this.edit_years_state = null;
            this.edit_permitted = false;
        }
        else if (newValue < 0 || newValue > 100){
            this.edit_years_state=false;
            this.edit_permitted = false;
        } 
        else{
            this.edit_years_state=true;
            this.edit_permitted = true;
        }
    }

    // LIFECYCLE HOOKS --------------------------------------------------------------------------------
    private async mounted(){
        try{
            const url = api(`users_skills/${this.userid_prop}`);
            const response = await axios.get(url);
            this.skills = response.data;
            this.logged_in_user = (this.$store.state.auth.user.id == this.userid_prop);
            if (this.logged_in_user){
                this.fields = ["name", "experience", "actions"];
            }
        } catch (err) {
            console.log(err);
        }
    }

    // METHODS ----------------------------------------------------------------------------------------
    /**
     * Format experience in years and months.
     * @param nMonths total months of experience
     */
    private format_experience(nMonths: number): string {
        let years: number|string = Math.floor(nMonths / 12);
        let months: number|string = nMonths % 12;
        if (years == 0){
            years = '';
        } else if (years == 1){
            years = '1 year';
        } else {
            years = `${years} years`
        }
        if (months == 0){
            months = '';
        } 
        else if (months == 1){
            months = '1 month'
        }else{
            months = `${months} months`;
        }
        if (years === '' || months === ''){
            return years+months;
        }
        return years+', '+months;
    }


    /**
     * Show form for changing a skill.
     */
    private onEditSkill(skill: Skill): void{
        let editSkillModal: any = this.$refs.editSkill;
        editSkillModal.show();
        this.selected_skill_name = skill.name;
        this.edit_name = skill.name;
        this.edit_month_selected = skill.experience % 12;
        this.edit_years = Math.floor(skill.experience/12);
    }

    /**
     * Show warning modal before deleting a skill.
     */
    private onDeleteSkill(skill: Skill): void {
        let deleteSkillModal: any = this.$refs.deleteSkill;
        deleteSkillModal.show();
        this.selected_skill_name = skill.name;
    }

    /**
     * Save new skill data to the database.
     * @param userID skill of the user with id userID will be updated
     * @param skill_name the old name of the skill
     * @param newSkill the new data of the skill (new name and new experience)
     */
    private async saveEdit(): Promise<void> {
        if (!this.edit_years){return}
        const url = api(`users_skills/${this.userid_prop}/${this.selected_skill_name}`);
        const new_experience: number = this.edit_years * 12 + this.edit_month_selected;
        try{
            const newSkill: Skill = {
                name: this.edit_name,
                experience: new_experience,
                weight: null
            }
            await axios.put(url, {skill: newSkill}, {headers: {'Content-Type': 'application/json'}});
            window.location.reload(true);
        } catch (err) {
            console.log("Error while updating user's skill.");
        }
    }

    /**
     * Delete skill from the database.
     */
    private async saveDeletion(): Promise<void> {
        const url = api(`users_skills/${this.userid_prop}/${this.selected_skill_name}`);
        try{
            await axios.delete(url);
            window.location.reload(true);
        } catch (err) {
            console.log("Error while updating user's skill.");
        }
    }

    /**
     * Save new skill into the database.
     */
    private async saveAddition(): Promise<void> {
        if (this.add_permitted && this.years){
            const experience: number = this.years*12 + this.month_selected
            const skill: Skill = {
                name: this.new_name,
                experience: experience,
                weight: null
            }
            const url = api(`users_skills/${this.userid_prop}`);
            try{
                await axios.post(url, {skill: skill}, {headers: {'Content-Type': 'application/json'}});
                window.location.reload(true);
            } catch (err) {
                console.log("Error while adding user's skill.");
            }
        }        
    }

    /**
     * Check if new skill name already exists.
     * @param name the name of the new skill.
     */
    private skillAlreadyExists(name: string): boolean {
        for (let i = 0; i < this.skills.length; i++){
            if (this.skills[i].name.toUpperCase() === name.toUpperCase()){
                return true;
            }
        }
        return false;
    }
}
