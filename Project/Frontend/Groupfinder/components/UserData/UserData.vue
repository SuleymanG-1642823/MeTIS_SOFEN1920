<template>
    <b-container v-if="this.user" style="wrapper" fluid>
        <b-row>
            <b-col id="image_column" lg>
                <b-img id="profile_image" fluid-grow alt="ProfileImage" src="https://img.icons8.com/ios/100/000000/user.png"/>
            </b-col>
            <b-col lg>
                <p>{{ this.user.first_name }} {{ this.user.last_name }}</p>
                <p v-if="!this.privateData && this.user.address"> <i class="fas fa-map-marker-alt"></i> {{ this.user.address }}</p>
                <p v-if="!this.privateData && this.user.zip && this.user.city"><i class="fas fa-building"></i> {{ this.user.zip }}, {{ this.user.city }}</p>
                <p v-if="!this.privateData && this.user.tel"><i class="fas fa-phone"></i> {{ this.user.tel }}</p>
                <p v-if="!this.privateData && this.user.mail"><i class="fas fa-envelope"></i> {{ this.user.mail }}</p>
            </b-col>
            <b-col lg>
                <p><i class="fas fa-globe"></i> <a>www.link-to-my-website.be</a></p>
                <p>TODO: rating</p>
                <p v-if="this.user.available">AVAILABLE</p>
                <p v-else>UNAVAILABLE</p>
            </b-col>
            <b-col>
                <a id="facebook_icon" class="social_media_icon" href="https://www.facebook.com"><i class="fab fa-facebook"></i></a>
                <a id="twitter_icon" class="social_media_icon" href="https://www.twitter.com"><i class="fab fa-twitter-square"></i></a>
                <a id="linkedin_icon" class="social_media_icon" href="https://linkedin.com"><i class="fab fa-linkedin"></i></a>
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
    #facebook_icon{
        color:#3B5B98;
    }
    #twitter_icon{
        color:#0CA4F6;
    }
    #linkedin_icon{
        color:#227AC3;
    }
    .social_media_icon{
        float: right;
        clear: right;
        font-size: 30px;
    }
</style>
