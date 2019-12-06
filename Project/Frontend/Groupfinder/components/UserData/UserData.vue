<template>
    <b-container style="wrapper" v-if="this.user_prop" fluid>
        <b-row>
            <b-col class="image" lg>
                <p>IMAGE</p>
            </b-col>
            <b-col class="personaldata" lg>
                <p>Liese Bekkers</p>
                <p>3650, Dilsen-Stokkem</p>
                <p>+32 123 45 67 89</p>
                <p>liese.bekkers@student.uhasselt.be</p>
            </b-col>
            <b-col class="social" lg>
                <p>SOCIAL MEDIA ICONS</p>
                <p><a>www.link-to-my-website.be</a></p>
                <p>RATING</p>
                <p>(UN)AVAILABLE</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./UserData.ts">
</script>

<style scoped>
    .image{
        background-color:cornsilk;
    }
    .personaldata{
        background-color:blanchedalmond;
    }
    .social{
        background-color:bisque
    }

</style>
