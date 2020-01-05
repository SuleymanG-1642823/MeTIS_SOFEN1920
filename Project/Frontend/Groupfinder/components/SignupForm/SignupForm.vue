<template>
<div id="signup-content" class="center">
    <h1 id="signup-title">Sign up now!</h1>
    <b-button @click="removeError(index)" v-for="(error, index) in errors" :key="index" class="btn-danger error-message center clearfix">
        {{ error }}
        <span aria-hidden="true" class="float-right">
        &times;
        </span>
    </b-button>
    <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form id="signup-form" @submit.prevent="validate().then(onSignup)">
            <div id="name-fields" class="clearfix">
                <!-- First Name -->
                <ValidationProvider v-slot="{ valid, errors }" rules="required" name="fname">
                <b-form-group
                id="input-group-fname"
                xlabel="First name"
                label-for="input-fname"
                >
                    <b-form-input
                    id="input-fname"
                    v-model="first_name"
                    :state="errors[0] ? false : (valid ? true : null)"
                    type="text"
                    placeholder="First name"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                </ValidationProvider>
                <!-- Last Name -->
                <ValidationProvider v-slot="{ valid, errors }" rules="required" name="lname">
                <b-form-group
                id="input-group-lname"
                xlabel="Last name"
                label-for="input-lname"
                >
                    <b-form-input
                    id="input-lname"
                    v-model="last_name"
                    :state="errors[0] ? false : (valid ? true : null)"
                    type="text"
                    placeholder="Last name"
                    ></b-form-input>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
                </ValidationProvider>
            </div>
            <!-- Mail -->
            <ValidationProvider v-slot="{ valid, errors }" rules="required|email" name="email" vid="email">
            <b-form-group
                id="input-group-mail"
                xlabel="Email"
                label-for="input-mail"
            >
                <b-form-input
                    id="input-mail"
                    v-model="mail"
                    :state="errors[0] ? false : (valid ? true : null)"
                    type="email"
                    placeholder="Email"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </ValidationProvider>
            <!-- Mail confirmation -->
            <ValidationProvider v-slot="{ valid, errors }" rules="required|confirmed:email" name="emailC">
            <b-form-group
                id="input-group-confirmation"
                xlabel="Email confirmation"
                label-for="input-confirmation"
                >
                <b-form-input
                    id="input-confirmation"
                    v-model="mailConfirmation"
                    :state="errors[0] ? false : (valid ? true : null)"
                    type="email"
                    placeholder="Re-enter email"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
            </b-form-group>
            </ValidationProvider>
            <!-- Password -->
            <ValidationProvider v-slot="{ valid, errors }" rules="required|uppercase|lowercase|digit|min:8" name="emailC">
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
                        :state="errors[0] ? false : (valid ? true : null)"
                        placeholder="New password"
                    ></b-form-input>
                    <b-input-group-append>
                        <b-button id="toggle" @click="toggleVisibility" variant="outline-secondary">{{ passwordToggle }}</b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                </b-input-group>
            </b-form-group>
            </ValidationProvider>
            <b-button class="float-right" type="submit" variant="primary">Sign up</b-button>
        </b-form>
    </ValidationObserver>
</div>
</template>

<script lang="ts" src="./SignupForm.ts">
</script>

<style scoped>
#signup-form {
    width: 100%;
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
    padding: 0 0 0rem;
}
#signup-content {
    width: 100%;
    min-width: 300px;
    padding: 20px;
}
.error-message{
    display: block;
    width: 100%;
    margin: 5px auto;
    text-align: center;
}
#toggle{
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
}
</style>
