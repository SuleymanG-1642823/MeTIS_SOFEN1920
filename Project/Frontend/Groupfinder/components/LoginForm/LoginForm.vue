<template>
  <div class="pl-3">
    <b-form id="login_form" @submit.prevent="tryLogin">
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
        <b-input-group>
            <b-form-input
                id="input-password"
                v-model="pass"
                :type="passwordFieldType"
                required
                placeholder=""
            ></b-form-input>
            <b-input-group-append>
                <b-button @click="toggleVisibility" variant="outline-secondary">{{ passwordToggle }}</b-button>
            </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <div class="clearfix">
        <b-button class="float-left" type="submit" variant="primary">Log in</b-button>
        <a href="/" class="minimal-btn small float-right">Forgot password?</a>
      </div>
    </b-form>
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
