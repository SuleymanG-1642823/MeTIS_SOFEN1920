<template>
<div>
    <b-modal :id="'modal' + id" ok-only>
        <p>
            Use a questionnaire to ask specific questions to users who want to apply for this profile.
        </p>
        <b-input-group v-for="(question, index) in questionnaire.questions" v-bind:key="index" class="mt-3">
            <b-form-input placeholder="Question" v-model="questionnaire.questions[index]"></b-form-input>
            <b-input-group-append>
                <b-button @click="deleteQuestion(index)" variant="outline-danger">Delete</b-button>
            </b-input-group-append>
        </b-input-group>

        <b-input-group class="mt-3">
            <b-form-input placeholder="Question" v-model="inputText"></b-form-input>
            <b-input-group-append>
                <b-button @click="addQuestion" variant="primary">Add</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-modal>
</div>
</template>

<script lang="ts" src="./Questionnaire.ts">
</script>
