<template>
    <b-container style="wrapper" v-if="this.user" fluid>
        <b-row>
            <b-col class="image" lg>
                <p>IMAGE</p>
            </b-col>
            <b-col class="personaldata" lg>
                <p>{{ this.user.first_name }} {{this.user.last_name}}</p>
                <p v-if="!this.privateData && this.user.zip && this.user.city">{{ this.user.zip }}, {{ this.user.city }}</p>
                <p v-if="!this.privateData && this.user.tel">{{ this.user.tel }}</p>
                <p v-if="!this.privateData && this.user.mail">{{ this.user.mail }}</p>
            </b-col>
            <b-col class="social" lg>
                <p>SOCIAL MEDIA ICONS</p>
                <p><a>www.link-to-my-website.be</a></p>
                <p>RATING</p>
                <p>(UN)AVAILABLE</p>
            </b-col>
        </b-row>
        <b-row>
            <b-button style="float-right" v-b-modal.editData>Edit data</b-button>
            <EditUserData :user_prop="this.user" />
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./UserData.ts">
</script>

<style scoped>
</style>
