<template>
    <b-container style="wrapper" v-if="this.user" fluid>
        <b-row>
            <b-col id="image_column" lg>
                <b-img id="profile_image" fluid-grow alt="ProfileImage" src="https://img.icons8.com/ios/100/000000/user.png"/>
            </b-col>
            <b-col lg>
                <p>{{ this.user.first_name }} {{this.user.last_name}}</p>
                <p v-if="!this.privateData && this.user.address"> <i class="fas fa-map-marker-alt"></i> {{ this.user.address }}</p>
                <p v-if="!this.privateData && this.user.zip && this.user.city"><i class="fas fa-building"></i> {{ this.user.zip }}, {{ this.user.city }}</p>
                <p v-if="!this.privateData && this.user.tel"><i class="fas fa-phone"></i> {{ this.user.tel }}</p>
                <p v-if="!this.privateData && this.user.mail"><i class="fas fa-envelope"></i> {{ this.user.mail }}</p>
            </b-col>
            <b-col lg>
                <p>SOCIAL MEDIA ICONS</p>
                <p><i class="fas fa-globe"></i> <a>www.link-to-my-website.be</a></p>
                <p>TODO: rating</p>
                <p>TODO: (UN)AVAILABLE</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./UserData.ts">
</script>

<style scoped>
    #profile_image{
        width: auto;
        height: auto;
        max-height: 200px;
        max-width: 100%;
    }
</style>
