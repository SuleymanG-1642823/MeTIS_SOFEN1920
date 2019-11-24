<template>
  <div class="container">
    <div>
      <h1>Homepage</h1>
      <RecommendedProjectsList :projectMatches="myData" />
      <NameCard />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* TEST */
import RecommendedProjectsList from './../components/RecommendedProjectsList/RecommendedProjectsList'

class MyData {
  project0 = { name: 'project1',
    id: 0,
    status: 0,
    pitch: '',
    created_at: '',
    edited_at: '',
    creator_id: 0,
    creator_first_name: '',
    creator_last_name: '',
    profiles: [ { id: 0, name: 'front-end developper', project_id: 0 }, { id: 1, name: 'back-end developper', project_id: 0 } ] }

  project0Matches = [{ profileID: 0, profileName: 'front-end developper', matchingPercentile: 75 }, { profileID: 1, profileName: 'back-end developper', matchingPercentile: 40 }]

  project1 = { name: 'project2',
    id: 1,
    status: 0,
    pitch: '',
    created_at: '',
    edited_at: '',
    creator_id: 0,
    creator_first_name: '',
    creator_last_name: '',
    profiles: [ { id: 2, name: 'database manager', project_id: 1 } ] }

    project1Matches = [{ profileID: 2, profileName: 'database manager', matchingPercentile: 65 }]

    completeData = [{ project: this.project0, matches: this.project0Matches }, { project: this.project1, matches: this.project1Matches }]

    getData () { return this.completeData }
}

/* **** */

Vue.use(BootstrapVue)

@Component({
  components: {
    RecommendedProjectsList
  }
})
export default class Index extends Vue {
  myData = new MyData().getData()
}

</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
