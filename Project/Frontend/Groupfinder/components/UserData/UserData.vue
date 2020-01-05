<template>
    <div v-if="this.user">
        <h1>{{ this.user.first_name }} {{ this.user.last_name }}</h1>
        <b-row>
            <b-col lg=4>
                <p v-if="(this.logged_in_user || !this.privateData) && this.user.address"> <i class="fas fa-map-marker-alt"></i> {{ this.user.address }}</p>
                <p v-if="(this.logged_in_user || !this.privateData) && this.user.zip && this.user.city"><i class="fas fa-building"></i> {{ this.user.zip }}, {{ this.user.city }}</p>
                <p v-if="(this.logged_in_user || !this.privateData) && this.user.tel"><i class="fas fa-phone"></i> {{ this.user.tel }}</p>
                <p v-if="(this.logged_in_user || !this.privateData) && this.user.mail"><i class="fas fa-envelope"></i> {{ this.user.mail }}</p>
            </b-col>
            <b-col lg>
                <p><i class="fas fa-globe"></i> <a>www.link-to-my-website.be</a></p>
                <p>Rating: <star-rating v-model="rating" :star-size="20" :increment="0.5" :read-only="true"></star-rating>({{ nRatings }} in total)</p>
                <p v-if="this.user.available"><i class="fas fa-circle green"></i> available for joining projects</p>
                <p v-else><i class="fas fa-circle red"></i> unavailable for joining projects</p>
            </b-col>
            <b-col v-if="social_media">
                <a v-if="social_media[0].suffix !== ''" id="facebook_icon" class="social_media_icon" :href=social_media[0].prefix.concat(social_media[0].suffix)><i class="fab fa-facebook"></i></a>
                <a v-if="social_media[1].suffix !== ''" id="twitter_icon" class="social_media_icon" :href=social_media[1].prefix.concat(social_media[1].suffix)><i class="fab fa-twitter-square"></i></a>
                <a v-if="social_media[2].suffix !== ''" id="linkedin_icon" class="social_media_icon" :href=social_media[2].prefix.concat(social_media[2].suffix)><i class="fab fa-linkedin"></i></a>
                <a v-if="social_media[3].suffix !== ''" id="github_icon" class="social_media_icon" :href=social_media[3].prefix.concat(social_media[3].suffix)><i class="fab fa-github-square"></i></a>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts" src="./UserData.ts">
</script>

<style scoped>
    .row{
        margin-top: 20px;
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
    #github_icon{
        color: black;
    }
    .social_media_icon{
        font-size: 30px;
        margin-left: 10px;
    }
    .green{
        color:green;
    }
    .red{
        color: grey;
    }
    .fas.fa-circle{
        font-size: 10px;
        line-height: 100%;
    }
</style>
