<template>
<div>
<b-card class="mb-2">
  <!-- TODO: FIX error on  @submit="onSubmit" @reset="onReset" -->
  <b-form>
    <!-- Profile name input -->
    <b-form-group
      id="input-profilename-id"
      label="Profile name:"
      label-for="input-profilename"
    >
      <!-- Error on: v-model="form.profileName"
        Please fix -->
      <b-form-input
        id ="input-profilename"
        required
        placeholder="Enter a profile name"
        v-model="profile.name"
      ></b-form-input>
    </b-form-group>

    <!-- skill input -->
    <b-form-group id="input-skill-id" label="Skills:" label-for="input-skill">
      <b-input-group>
        <b-form-input v-model="skill_input" id="input-skill" placeholder="Enter skill"></b-form-input>
        <b-input-group-append>
          <b-button @click="addSkill(skill_input)" variant="primary">Add</b-button>
        </b-input-group-append>
      </b-input-group>
      <ul class="list-no-style">
        <li v-for="(skill, index) in profile.skills" v-bind:key="index" class="py-3">
          <b-card
            class="mb-2"
            border-variant="primary"
            :header='profile.skills[index].name'
            header-bg-variant="primary"
            header-text-variant="white">
            <font-awesome-icon rel="tooltip" title="Use the slider to indicate how important a skill is" icon="question-circle" class="card-element-right" />
            <div class="px-3 py-3">
              <vue-slider
                v-model="profile.skills[index].weight"
                :adsorb="true"
                :interval="1"
                :min="0"
                :max="10"
                :marks="true"
                class="skill-slider"/>
            </div>
            <b-form-group
              label="How much experience with this skill is required?"
              label-cols-sm="10"
              label-cols-lg="9">
              <b-input-group>
                <b-form-input v-model="profile.skills[index].experience" class="mb-3" type="number" min="0"></b-form-input>
                <template v-slot:append>
                  <b-input-group-text class="mb-3">years</b-input-group-text>
                </template>
              </b-input-group>
            </b-form-group>
            <b-button @click="deleteSkillFromIndex(index)" class="card-element-right" variant="outline-danger" size="sm">
              <font-awesome-icon icon="trash-alt" />
            </b-button>
          </b-card>
        </li>
      </ul>
    </b-form-group>

  </b-form>
  <Questionnaire
  :questions="profile.questions"
  :id="profile.id"
  :userQuestionnaireList="userQuestionnaireList"
  @update_questionnaire="update_questionnaire"/>
  <i class="fas fa-check" rel="tooltip" title="The questionnaire of this profile has been filled in"></i>
  <b-button @click="$bvModal.show(modalId())" variant="info" size="sm">Edit questionnaire</b-button>
  <b-button @click="deleteProfileFromList()" variant="danger" size="sm">Delete Profile</b-button>
</b-card>
</div>
</template>

<script lang="ts" src="./profileForm.ts">
</script>

<style scoped>
.list-no-style {
  list-style: none;
  padding-left: 0;
}

.skill-slider {
  margin-top: 0px;
  margin-bottom: 40px;
}

.card-element-right{
  float: right;
}
</style>
