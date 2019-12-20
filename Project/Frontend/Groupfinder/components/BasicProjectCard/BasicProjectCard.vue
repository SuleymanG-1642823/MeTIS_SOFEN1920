<template>
    <b-card v-if="this.project" :title="this.project.name" :sub-title="creatorName">
        <b-card-text>
            <p>{{ this.project.pitch }}</p>
            <p>Status: {{ this.project.status }}</p>
            <p>Average rating: {{ this.avgRating }}</p>
            <b-button v-if="this.nRatings > 0" v-b-toggle="this.project.id.toString()" v-on:click="changeButtonText()">{{ this.buttonText }}</b-button>
            <b-collapse v-if="this.nRatings > 0" :id="this.project.id.toString()">
                <b-card v-for="review in this.reviews" v-bind:key="review.id" :title="review.rating.toString()" :sub-title="createFullName(review.writer_first_name, review.writer_last_name)">
                    <b-card-text>{{ review.message }}</b-card-text>
                </b-card>
            </b-collapse>
        </b-card-text>
    </b-card>
</template>

<script lang="ts" src="./BasicProjectCard.ts">
</script>
