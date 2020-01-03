<template>
    <div id="wrapper">
        <div class="head">
            <h1 id="title">{{ title }}</h1>
            <span
                id="createdAt"
                v-if="mCreatedAt !== ''"
            >
                <i class="far fa-calendar-alt"></i>
                {{ mCreatedAt }}
            </span>
        </div>
        <p id="creator">
            <router-link :to=creatorUrl>{{ creator }}</router-link>
            <i
                class="far fa-comment"
                @click="goToChatPage(creatorID)"
            ></i>
        </p>
        <div id="categories">
            <b-badge
                class="category badge"
                pill
                variant="dark"
                v-for="category in categories"
                :key="category.id"
            >
                {{ category.name }}
            </b-badge>
        </div>
        <p id="description">{{ description }}</p>
    </div>
</template>

<script lang="ts" src="./ProjectInformation.ts">
</script>

<style scoped>

div#wrapper{
    margin-bottom: 20px;
}

div.head{
    overflow: auto;
}

h1#title{
    color: black;
    font-weight: bolder;
    font-size: 1.8rem;
    display: block;
    float: left;
    margin-bottom: 0;
}

#creator{
    text-decoration: underline;
    color: #464545;
}

#creator > i{
    margin-left: 5px;
    font-size: 1.5rem;
    cursor: pointer;
}

span#createdAt{
    float: right;
    display: block;
}

span#createdAt > i{
    font-size: 1.5rem;
}

.category.badge{
    padding: 8px;
    font-size: 1rem;
}

#description{
    margin: 16px 0 16px 0;
}

</style>
