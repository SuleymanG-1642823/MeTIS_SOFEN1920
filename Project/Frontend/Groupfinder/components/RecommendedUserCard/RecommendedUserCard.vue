<template>
  <b-card id="root">
    <div class="header">
      <i class="far fa-user profile-user  profile-pic"></i>
      <span class="name">{{ userMatch.user.first_name + ' ' + userMatch.user.last_name }}</span>
      <i class="far fa-comment msg" @click="goToChatPage(userMatch.user.id)"></i>
      <address v-if="mUser !== null">
        <i class="fas fa-map-marker-alt"></i>
        {{ mUser.city }}
      </address>
    </div>
    <div class="body" v-if="mUserSkill.length > 0">
      <h5>Experience</h5>
      <p
        v-for="(skill, index) in mUserSkill"
        :key="index"
        class="skill"
      >
        {{ skill.name + ': ' + skill.experience + ' year of experience.' }}
      </p>
    </div>
    <div class="footer">
      <span>Compatibility with {{ profile.name }} </span>
      <div class="rating">
        <i class="fas fa-star full star" v-for="(e, index) in Array(mNumfullStars)" :key="'full-' + index"></i>
        <i class="fas fa-star-half-alt half star" v-if="mHalfStar"></i>
        <i class="far fa-star empty star" v-for="(e, index) in Array(mNumEmptyStars)" :key="'empty-' + index"></i>
      </div>
      <div class="buttons">
        <b-button v-if="mInviteSent" variant="light" disabled>
          <i class="fas fa-check"></i>
          Invitation sent
        </b-button>
        <b-button v-if="!mInviteSent" variant="outline-dark float-right btn-invite" size="sm" @click="inviteUser(userMatch.user.id)">Invite</b-button>
        <b-button variant="outline-dark float-right btn-profile" size="sm" @click="goToProfilePage(userMatch.user.id)">Show profile</b-button>
      </div>
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

#root .card-body{
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: max-content 1fr max-content;
}

div.body{
  margin: 16px 0;
}

div.footer{
  overflow: auto;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  grid-column-gap: 8px;
  align-items: center;
  bottom: 0;
}

p.skill{
  margin-bottom: 0;
}

i.msg{
  font-size: 1.4rem;
  margin-left: 4px;
}

div.footer div.buttons{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
}

div.rating > span{
  float: left;
}

</style>
