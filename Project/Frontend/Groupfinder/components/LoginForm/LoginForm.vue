<template>
    <b-form v-on:submit.prevent="tryLogin">
        <b-form-group
        id="input-group-mail"
        label="Email address"
        label-for="input-mail"
      >
       <!-- description="We'll never share your email with anyone else." -->
        <b-form-input
          id="input-mail"
          v-bind="mail"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="Password"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          v-model="pass"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log in</b-button>
    </b-form>
</template>

<script lang="ts" src="./LoginForm.ts">

</script>
