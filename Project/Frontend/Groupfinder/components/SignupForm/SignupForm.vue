<template>
    <div id="signup-content" class="center">
    <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-form id="signup-form" @submit.prevent="passes(onSignup)">
            <h1 id="signup-title">Sign up now!</h1>
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
                    type="text"
                    :state="errors[0] ? false : (valid ? true : null)"
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
                    type="text"
                    :state="errors[0] ? false : (valid ? true : null)"
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
                    v-model="email"
                    type="email"
                    :state="errors[0] ? false : (valid ? true : null)"
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
                    v-model="emailConfirmation"
                    type="email"
                    :state="errors[0] ? false : (valid ? true : null)"
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
                        <b-button variant="outline-secondary" @click="toggleVisibility" >{{ passwordToggle }}</b-button>
                    </b-input-group-append>
                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                </b-input-group>
            </b-form-group>
            </ValidationProvider>
            <b-button class="float-right" type="submit" variant="primary">Sign up</b-button>
        </b-form>
    </ValidationObserver>
    <p>{{ $store.state.auth.user }}</p>
    <button @click="commit">Update</button></div>
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
</style>
