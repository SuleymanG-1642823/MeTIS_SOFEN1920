<template>
    <div id="wrapper">
        <div class="head">
            <h1 id="title">{{ title }}</h1>
            <span
                id="createdAt"
                v-if="createdAt !== ''"
            >
                <i class="far fa-calendar-alt"></i>
                {{ createdAt }}
            </span>
        </div>
        <p id="creator">{{ creator }}</p>
        <div id="categories">
            <b-badge
                class="category badge"
                variant="info"
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

div.head{
    overflow: auto;
}

h1#title{
    color: black;
    font-weight: bolder;
    font-size: 1.8rem;
    display: block;
    float: left;
}

#creator{
    text-decoration: underline;
    color: #464545;
}

#createdAt{
    float: right;
    display: block;
}

.category.badge{
    padding: 8px;
    font-size: 1rem;
}

#description{
    margin: 16px 0 16px 0;
}

</style>
