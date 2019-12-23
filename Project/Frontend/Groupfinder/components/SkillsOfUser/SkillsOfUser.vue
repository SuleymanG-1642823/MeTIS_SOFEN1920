<template>
    <div style="overflow:auto;">
    <table id="skills_table">
        <tr> <!-- TABLE HEADER -->
            <th>Skill name</th>
            <th>Experience</th>
            <th v-if="logged_in_user">Actions</th>
        </tr>
        <tr v-if="logged_in_user"> <!-- ROW FOR ADDING NEW SKILL -->
            <td>
                <b-form inline>
                    <b-form-input
                        type="text"
                        v-model="new_name"
                        :state="new_name_state"
                        aria-describedby="feedback"
                        placeholder="Enter new skill">
                    </b-form-input>
                    <b-form-invalid-feedback id="feedback">
                        This skill name already exists.
                    </b-form-invalid-feedback>
                </b-form>
            </td>
            <td>
                <b-form inline>
                    <b-form-input
                    class="experience_input"
                    aria-describedby="years_feedback"
                    required
                    :state="years_state"
                    v-model=years
                    default=0
                    type="number"
                    min=0
                    max=100
                    placeholder="Enter years">
                    </b-form-input>
                    <b-form-invalid-feedback id="years_feedback">
                        Years of experience must be a a number between 0 and 100.
                    </b-form-invalid-feedback>
                    <b-form-select
                    class="experience_input"
                    v-model="month_selected"
                    :options="months_options"
                    placeholder="months">
                    </b-form-select>
                </b-form>
            </td>
            <td class="actions_column">
            <b-button class="round icon" :disabled=!add_permitted @click="saveAddition()"><i class="fas fa-plus"></i></b-button>
            </td>
        </tr> <!-- ALL EXISTING SKILLS -->
        <tr v-for="skill in skills" :key="skill.name">
            <td>{{ skill.name }}</td>
            <td>{{ format_experience(skill.experience) }}</td>
            <td v-if="logged_in_user" class="actions_column">
                <b-button class="round icon" @click="onEditSkill(skill)">
                    <i class="fas fa-pen"></i>
                </b-button>
                <b-button class="round icon" @click="onDeleteSkill(skill)">
                    <i class="fas fa-trash-alt"></i>
                </b-button>
            </td>
        </tr>
    </table>

    <b-modal
        v-if="logged_in_user"
        id="editSkill"
        ref="editSkill"
        title="Edit skill"
        :ok-disabled=!edit_permitted
        @ok="saveEdit()">
        <b-form>
            <b-form-group>
                <b-form-input
                    class="experience_input"
                    aria-describedby="edit_years_feedback"
                    required
                    :state="edit_years_state"
                    v-model=edit_years
                    default=0
                    type="number"
                    min=0
                    max=100
                    placeholder="Enter years">
                </b-form-input>
                <b-form-invalid-feedback id="edit_years_feedback">
                    Years of experience must be a a number between 0 and 100.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
                <b-form-select
                    class="experience_input"
                    v-model="edit_month_selected"
                    :options="months_options"
                    placeholder="months">
                </b-form-select>
            </b-form-group>
        </b-form>
    </b-modal>
    <b-modal v-if="logged_in_user" id="deleteSkill" ref="deleteSkill" title="Delete skill" @ok="saveDeletion()">
        <p>Are you sure you want to delete this skill?</p>
    </b-modal>
    </div>
</template>

<script lang="ts" src="./SkillsOfUser.ts">
</script>

<style scoped>
    .experience_input{
        min-width: 130px;
    }
    #skills_table{
        width: 100%;
        min-width: 300px;
    }
    #skills_table tr:nth-of-type(odd){
        background-color: rgba(0,0,0,.02);
    }
    #skills_table tr:nth-child(2) td{
        padding: 15px 5px;
    }
    #skills_table td, #skills_table th{
        padding: 5px;
        height: 50px;
        vertical-align: middle;
        border-top: 1px solid #ced4da8f;
    }
    #skills_table th{
        border-top: 1px solid #ced4da;
        border-bottom: 2px solid #ced4da;
        background-color: white;
    }
    .actions_column{
        width: 100px;
    }
    .round.icon{
        width: 40px;
        height: 40px;
        border-radius: 35px;
        font-size: 15px;
    }
</style>
