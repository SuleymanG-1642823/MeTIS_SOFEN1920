<template>
    <b-card v-if="this.project" :title="this.project.name" :sub-title="creatorName">
        <b-card-text>
            <p>{{ this.project.pitch }}</p>
            <p>Status: {{ this.project.status }}</p>
            <b-button v-b-toggle.collapse v-on:click="changeButtonText()">{{ this.buttonText }}</b-button>
            <b-collapse id="collapse">
                <b-card v-for="review in this.reviews" v-bind:key="review.id" :title="review.rating.toString()" :sub-title="createFullName(review.writer_first_name, review.writer_last_name)">
                    <b-card-text>{{ review.message }}</b-card-text>
                </b-card>
            </b-collapse>
        </b-card-text>
    </b-card>
</template>

<script lang="ts" src="./BasicProjectCard.ts">
</script>
