<template>
    <div id="signup-content" class="center">
    <b-form id="signup_form" @submit.prevent="onSignup">
        <h1 id="signup-title">Sign up now!</h1>
        <div id="name-fields" class="clearfix">
        <!-- First Name -->
        <b-from-group
          id="input-group-fname"
          xlabel="First name"
          label-for="input-fname"
        >
            <b-form-input
              id="input-fname"
              v-model="first_name"
              type="text"
              required
              placeholder="First name"
            ></b-form-input>
            </b-from-group>
         <!-- Last Name -->
            <b-from-group
          id="input-group-lname"
          xlabel="Last name"
          label-for="input-lname"
        >
            <b-form-input
              id="input-lname"
              v-model="last_name"
              type="text"
              required
              placeholder="Last name"
            ></b-form-input>
        </b-from-group>
        </div>
        <!-- Mail -->
        <b-form-group
            id="input-group-mail"
            xlabel="Email"
            label-for="input-mail"
        >
            <b-form-input
                id="input-mail"
                v-model="email"
                type="email"
                required
                placeholder="Email"
                :rules="emailRules"
            ></b-form-input>
        </b-form-group>
        <!-- Mail confirmation -->
        <b-form-group
            id="input-group-mail"
            xlabel="Email confirmation"
            label-for="input-mail"
            >
            <b-form-input
                id="input-mail_confirm"
                v-model="emailConfirmation"
                type="email"
                required
                placeholder="Re-enter email"
                :rules="emailRules"
            ></b-form-input>
        </b-form-group>
        <!-- Password -->
        <b-form-group
            id="input-group-password"
            xlabel="Password"
            label-for="input-password"
        >
        <b-input-group>
            <b-form-input
                id="input-password"
                v-model="password"
                :type="passwordFieldType"
                required
                placeholder="New password"
            ></b-form-input>
            <b-input-group-append>
                <b-button variant="outline-secondary" @click="toggleVisibility" >{{ passwordToggle }}</b-button>
            </b-input-group-append>
        </b-input-group>
        </b-form-group>
        <b-button class="float-right" type="submit" variant="primary">Sign up</b-button>
    </b-form>
    </div>
</template>

<script lang="ts" src="./SignupForm.ts">
</script>

<style scoped>
#signup_form {
    max-width: 400px;
    margin: auto;
}
#input-group-fname {
    width: 48%;
    float: left;
}
#input-group-lname {
    width: 48%;
    float: right;
}
#name-fields {
    padding: 0 0 1rem;
}
#signup-content {
    width: 100%;
    padding: 20px;
}
</style>
