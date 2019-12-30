<template>
    <b-card v-if="this.project" :title="this.project.name" :sub-title="creatorName">
        <b-card-text>
            <p style="float: right;">Average rating: <star-rating v-model="this.avgRating" :star-size="20" :increment="0.5" :max-rating="5" :read-only="true"></star-rating>({{ nRatings }} in total)</p>
            <p>{{ this.project.pitch }}</p>
            <b-button v-if="this.nRatings > 0" v-b-toggle="this.project.id.toString()" @click="changeButtonText()">{{ this.buttonText }}</b-button>
            <b-collapse v-if="this.nRatings > 0" :id="this.project.id.toString()">
                <b-card v-for="review in this.reviews" v-bind:key="review.id" :sub-title="createFullName(review.writer_first_name, review.writer_last_name)">
                    <p><star-rating v-model="review.rating" :star-size="20" :increment="0.5" :max-rating="5" :read-only="true"></star-rating></p>
                    <b-card-text>{{ review.message }}</b-card-text>
                </b-card>
            </b-collapse>
        </b-card-text>
    </b-card>
</template>

<script lang="ts" src="./ProjectCardWithReviews.ts">
</script>
