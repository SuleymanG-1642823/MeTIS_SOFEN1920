import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Skill from '../../types/skill';
import axios from 'axios';
import api from '@/helpers/Api';

@Component
export default class SkillsOfUser extends Vue {
    // PROPS
    @Prop({type: Number, required: true}) readonly userid_prop: number;

    // DATA
    private fields: string[] = ["name", "experience"];
    private skills: Skill[] = [];
    private logged_in_user: boolean = false;
    private selected_skill_name: string = '';
    private edit_name: string = '';
    private edit_experience: number = 0;

    // LIFECYCLE HOOKS
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

    /**
     * Show form for changing a skill.
     */
    private onEditSkill(index: number, item: Skill): void{
        this.$refs.editSkill.show();
        this.selected_skill_name = item.name;
        this.edit_name = item.name;
        this.edit_experience = item.experience;
    }

    /**
     * Show warning modal before deleting a skill.
     */
    private onDeleteSkill(index: number, item: Skill): void {
        this.$refs.deleteSkill.show();
        this.selected_skill_name = item.name;
    }

    /**
     * Save new skill data to the database.
     * @param userID skill of the user with id userID will be updated
     * @param skill_name the old name of the skill
     * @param newSkill the new data of the skill (new name and new experience)
     */
    private async saveEdit(): Promise<void> {
        const url = api(`users_skills/${this.userid_prop}/${this.selected_skill_name}`);
        try{
            const newSkill: Skill = {
                name: this.edit_name,
                experience: this.edit_experience,
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
    private async saveAddition(skill: Skill): Promise<void> {
        const url = api(`users_skills/${this.userid_prop}`);
        try{
            await axios.post(url, {skill: skill}, {headers: {'Content-Type': 'application/json'}});
            window.location.reload(true);
        } catch (err) {
            console.log("Error while adding user's skill.");
        }
    }
}
