<template>
    <b-form @submit="handleSubmit">
        <b-form-group label="Old password:">
            <b-form-input type="password" v-model="old_password"/>
        </b-form-group>
        <b-form-group label="New password:" description="Your password must contain at least 8 characters, 1 capital letter, 1 lowercase letter and one digit.">
            <b-form-input type="password" v-model="new_password"/>
        </b-form-group>
        <b-form-group label="Repeat new password:">
            <b-form-input type="password" v-model="repeated_new_password"/>
        </b-form-group>
        <b-button id="changePswBtn" type="submit">Submit</b-button>
        <br/>
        <b-alert
            class="changePswMessage"
            variant="success"
            :show="showSuccessMessage"
            dismissible
            @dismissed="showSuccessMessage=false"
            >
            <p>Your password has successfully been changed.</p>
        </b-alert>
        <b-alert
            class="changePswMessage"
            variant="danger"
            :show="showFailMessage"
            dismissible
            @dismissed="showFailMessage=false"
            >
            <p>Your password could not be changed due to an internal server error, try again later.</p>
        </b-alert>
        <p>{{ this.invalidMessage }}</p>
      </b-form>
</template>

<script lang="ts" src="./ChangePassword.ts">
</script>

<style scoped>
    #changePswBtn{
        float: right
    }
    .changePswMessage{
        margin-top:20px;
    }
</style>
