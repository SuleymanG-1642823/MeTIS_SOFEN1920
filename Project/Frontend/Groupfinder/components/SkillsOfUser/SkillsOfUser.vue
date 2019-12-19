<template>
    <div>
    <b-table responsive :items="skills" :fields="fields">
        <template v-slot:cell(actions)="row">
            <b-button class="round icon" @click="onEditSkill(row.index, row.item)">
                <i class="fas fa-pen"></i>
            </b-button>
            <b-button class="round icon" @click="onDeleteSkill(row.index, row.item)">
                <i class="fas fa-trash-alt"></i>
            </b-button>
        </template>
    </b-table>
    <b-modal id="editSkill" ref="editSkill" title="Edit skill" @ok="saveEdit()">
        <b-form>
            <b-form-group
            description="You cannot have two skills with the same name."
            label="Skill name:"
            label-for="name"
            >
            <b-form-input id="name" v-model="edit_name"></b-form-input>
            </b-form-group>
            <b-form-group
            label="Experience"
            label-for="name"
            >
            <b-form-input id="name" type="number" v-model="edit_experience"></b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
    <b-modal id="deleteSkill" ref="deleteSkill" title="Delete skill" @ok="saveDeletion()">
        <p>Are you sure that you want to delete this skill?</p>
    </b-modal>
    </div>
</template>

<script lang="ts" src="./SkillsOfUser.ts">
</script>

<style scoped>
    .round.icon{
        width: 50px;
        height: 50px;
        border-radius: 35px;
        font-size: 20px;
    }
</style>
