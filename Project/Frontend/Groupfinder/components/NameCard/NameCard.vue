<template>
  <b-card v-if="user">
    <b-card-text>
      <p>ID: {{ user.id }}</p>
      <p>Voornaam: {{ user.first_name }}</p>
      <p>Achternaam: {{ user.last_name }}</p>
      <p>E-mail: {{ user.email }}</p>
    </b-card-text>
  </b-card>
</template>

<script lang="ts" src="./NameCard.ts">
</script>

<style scoped>
</style>
