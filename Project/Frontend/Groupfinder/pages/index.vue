<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <RecommendedUsersList
        :profileUserMatches="recommendedUsers"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import BootstrapVue from 'bootstrap-vue'

import RecommendedUsersList from '../components/RecommendedUsersList/RecommendedUsersList'
import ProfileUserMatch from '../types/matching/profileUserMatch'

Vue.use(BootstrapVue)

/**
 * :profile="recommendedUsers[0].profile"
        :user-match="recommendedUsers[0].userMatches[0]"
 */

@Component({
  components: {
    RecommendedUsersList
  }
})
export default class Index extends Vue {
  recommendedUsers: Array<ProfileUserMatch>|null = null;

  created () {
    const tempData = '[{"profile":{"id":8010,"name":"Profile A","project_id":7010},"userMatches":[{"user":{"id":6011,"first_name":"testUser11","last_name":"11","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":100}]},{"profile":{"id":8011,"name":"Profile B","project_id":7010},"userMatches":[{"user":{"id":6012,"first_name":"testUser12","last_name":"12","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":83},{"user":{"id":6011,"first_name":"testUser11","last_name":"11","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":53},{"user":{"id":6013,"first_name":"testUser13","last_name":"13","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":51}]},{"profile":{"id":8013,"name":"Profile D","project_id":7010},"userMatches":[{"user":{"id":6013,"first_name":"testUser13","last_name":"13","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":66}]},{"profile":{"id":8012,"name":"Profile C","project_id":7010},"userMatches":[{"user":{"id":6012,"first_name":"testUser12","last_name":"12","mail":"","address":"","zip":"","city":"","tel":"","website":"","social_media":""},"matchingPercentage":34}]}]'
    this.recommendedUsers = JSON.parse(tempData)
  }
}

</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
