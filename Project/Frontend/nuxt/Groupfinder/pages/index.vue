<template>
  <div class="container">
    <h1 class="mt-5">BI Studenten</h1>
    <div class="row">
      <div v-for="user in biStudents" :key="user.email" class="col-4">
        <NameCard :user="user" />
      </div>
    </div>

    <h1 class="mt-5">IT Studenten</h1>
    <div class="row">
      <div v-for="user in itStudents" :key="user.email" class="col-4">
        <NameCard :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import NameCard from '~/components/NameCard/NameCard'

export default {
  components: {
    NameCard
  },
  data () {
    return {
      users: [
        {
          first_name: 'Liese',
          last_name: 'Bekkers',
          email: 'liese.bekkers@student.uhasselt.be'
        },
        {
          first_name: 'Marino',
          last_name: 'Soro',
          email: 'marino.soro@student.uhasselt.be'
        },
        {
          first_name: 'Lennert',
          last_name: 'Geebelen',
          email: 'lennert.geebelen@student.uhasselt.be'
        }
      ]
    }
  },
  computed: {
    biStudents () {
      return this.$_.filter(this.users, (o) => {
        return o.first_name === 'Marino'
      })
    },
    itStudents () {
      return this.$_.filter(this.users, (o) => {
        return o.first_name !== 'Marino'
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
}
</style>
