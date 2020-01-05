<template>
  <div id="wrapper">
    <h1 id="title">Projects</h1>
    <b-form-input
      placeholder="Search projects"
      v-model="searchInput"
      @input="showSearchFeedback = false"
      @keyup.enter="search()"
      autocomplete="off"
    ></b-form-input>
    <p id="searchFeedback" v-if="showSearchFeedback">No projects found for "{{ searchInput }}"</p>
    <RecommendedProjectsList
      v-if="searchResults.length === 0"
      :projectMatches="recommendedProjects"
      class="recommended-projects"
    />
    <div id="searchResults" v-if="searchResults.length > 0">
      <b-card
        v-for="(project, index) in searchResults"
        :key="index"
      >
        <router-link :to="'/project/' + project.id">
          <b-card-title>{{ project.name }}</b-card-title>
        </router-link>
        <b-card-sub-title class="sub-title">{{ 'By ' + project.creator_first_name + ' ' + project.creator_last_name }}</b-card-sub-title>
        <b-card-text>{{ project.pitch }}</b-card-text>
      </b-card>
    </div>
    <strong v-if="recommendedProjects == null || recommendedProjects.length === 0">
      There are no project that are compatible with your profile
    </strong>
  </div>
</template>

<script lang="ts" src='./recommendedProjects.ts'>
</script>

<style scoped>

strong{
  margin: 40px auto;
  padding: 10px;
  text-align: center;
  color: rgb(88, 88, 88);
  font-size: 2rem;
  font-weight: bolder;
  display: block;
  width: 100%;
}

div#wrapper{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto 1fr;
}

h1#title{
  width: inherit;
}

p#searchFeedback{
  color: rgba(110, 27, 27, 0.589);
  margin-left: 4px;
}

.sub-title{
  margin-bottom: 8px;
}

div#searchResults{
  margin-top: 24px;
  display: grid;
  grid-row-gap: 16px;
}

.recommended-projects{
  margin-top: 24px;
}

</style>
