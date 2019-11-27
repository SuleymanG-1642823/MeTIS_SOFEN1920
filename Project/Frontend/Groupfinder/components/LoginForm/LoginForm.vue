<template>
  <div class="pl-3">
    <b-form v-on:submit.prevent="tryLogin" id="login_form">
      <b-form-group
        id="input-group-mail"
        label="Email address"
        label-for="input-mail"
      >
        <b-form-input
          id="input-mail"
          v-model="mail"
          type="email"
          required
          placeholder="user@example.com"
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
          placeholder=""
        ></b-form-input>
      </b-form-group>
      <div class="clearfix">
        <b-button class="float-left" type="submit" variant="primary">Log in</b-button>
        <a href="/" class="minimal-btn small float-right">Forgot password?</a>
      </div>
    </b-form>
    <div class="px-2 py-2">
      <p>Not logged in?</p>
      <b-button variant="outline-primary"><nuxt-link to="signup">Sign up</nuxt-link></b-button>
    </div>
  </div>
</template>

<script lang="ts" src="./LoginForm.ts">
</script>

<style scoped>
.minimal-btn {
  display: inline-block;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  padding: 0.375rem 0.75rem;
}
.small {
  font-size: 75%;
}
#login_form {
  max-width: 250px;
  min-width: 150px;
  padding: 10px;
}
</style>
