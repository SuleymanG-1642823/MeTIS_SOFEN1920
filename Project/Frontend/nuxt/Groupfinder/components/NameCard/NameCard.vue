<template>
  <div v-if="user" class="nameCard">
    <p>First name: {{ user.first_name }}</p>
    <p>Last name: {{ user.last_name }}</p>
    <p>E-mail: {{ user.email }}</p>
  </div>
</template>

<script lang="ts" src="./NameCard.ts">
</script>

<style scoped>
  .nameCard{
    border: 2px groove grey;
    padding: 5px;
  }
</style>
