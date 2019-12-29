<template>
  <b-card id="root">
    <div class="header">
      <i class="far fa-user profile-user  profile-pic"></i>
      <span class="name">{{ userMatch.user.first_name + ' ' + userMatch.user.last_name }}</span>
      <!-- v-if="userMatch.user.city !== undefined && userMatch.user.city !== ''" -->
      <address>
        <i class="fas fa-map-marker-alt"></i>
        {{ userMatch.user.city }} CITY
      </address>
    </div>
    <div class="body">
      <h5>Experience</h5>
      <p v-for="(skill, index) in mUserSkill" :key="index">{{ skill }}</p>
    </div>
    <div class="footer">
      <div class="rating">
        <i class="fas fa-star full star" v-for="(e, index) in Array(mNumfullStars)" :key="'full-' + index"></i>
        <i class="fas fa-star-half-alt half star" v-if="mHalfStar"></i>
        <i class="far fa-star empty star" v-for="(e, index) in Array(mNumEmptyStars)" :key="'empty-' + index"></i>
      </div>
      <b-button variant="outline-dark float-right btn-profile" size="sm">Show profile</b-button>
    </div>
  </b-card>
</template>

<script lang="ts" src="./RecommendedUserCard.ts">
</script>

<style scoped>
#root{
    margin-bottom: 10px;
}

.card-body{
    padding: 10px;
}

address{
  float: right;
}

.profile-pic{
  font-size: 1.8rem;
}

span.name{
  font-size: 1.3rem;
  font-weight: bolder;
  margin-left: 8px;
}

i.star{
  display: block;
  float: left;
}

div.body{
  margin: 16px 0;
}

div.footer{
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: center;
}

</style>
